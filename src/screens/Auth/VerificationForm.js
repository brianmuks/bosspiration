/**  @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import { VERIFICATION_FIELD } from "./constants";
import {
  Container,
  Button,
  Content,
  Item,
  Input,
  Label,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
  Row,
  Root,
  Spinner
} from "native-base";

import { Alert } from "react-native";
import { NO_INTERNET_MSG, APP_IS_BUSY_MSG, APP_PRIMARY_COLOR, APP_SECONDARY_COLOR } from "../../constants";
import styles from "./Styles";
import { checkEmailVerification, checkPhoneNumberVerification } from './Methods';
import { showMsg, validateEmail, getConnectionStatus } from "../../utils";
import PhoneInput from 'react-native-phone-input';
import APP_STYLES from '../../constants/Styles';


type Props = {};
class VerificationForm extends Component<Props> {
  constructor(props) {
    super();
    self = this;
    this.state = {
      email: null,
      isWorking: false,
      phoneNumber: null,
      inputFields: props.fields || [],
      isShowVerificationScreen: false,
    };
  }

  componentWillMount() {
    const { verificationType } = this.props;
    const fields = VERIFICATION_FIELD({ type: verificationType });
    this.setState({ fields });
  }

  onChangeText = (key, txt) => {
    const state = {};
    state[key] = txt;
    this.setState(state);
  };

  setPhoneNumber() {
    const status = this.phone.isValidNumber();
    if (!status) {
      showMsg(
        'Invalid Phone Number ' + this.phone.getValue(),
        'danger',
        3000,
        'bottom',
      );
      return false;
    }

    const phoneNumber = this.phone.getValue();

    const countryCode = this.phone.getCountryCode();
    console.log(phoneNumber, countryCode, 'phoneNumber,countryCode');
    this.setState({ countryCode, phoneNumber });
    return phoneNumber;
  }

  _sendVerificationCode() {
    const { userName } = this.state;

    if (validateEmail(userName)) {
      //send code to email
      return;
    } else {
      //send code phone

      return;
    }
  }

  submit() {
    const { inputFields } = this.state;

    const { verificationType } = this.props;




    const { isWorking } = this.state;

    if (isWorking) return showMsg(APP_IS_BUSY_MSG, 'warning', 1000, 'bottom');;


    for (let index = 0; index < inputFields.length; index++) {
      const field = inputFields[index];

      if (field.name == 'phoneNumber') {
        continue;
      } else if (
        !this.state[field.name] ||
        this.state[field.name].trim().length === 0
      ) {
        Alert.alert(`Sorry ${field.label} can't be empty`);
        return;
      }
    }

    if (!getConnectionStatus()) {
      showMsg(NO_INTERNET_MSG, 'warning');
      return;
    }
    //TODO: determine if login is by email or phone

    const { email } = this.state;
    this.setState({ isWorking: true });


    if (email && validateEmail(email)) {
      const { onVerifyEmail } = this.props;
      //check if email number exist on the system


      checkEmailVerification({ email })
        .then(data => {
          this.setState({ isWorking: false });

          if (data && data.isError) {
            showMsg(`Error: ${data.reason}`, 'warning');
            return;
          } else if (data == null) {
            showMsg(
              `Sorry no record found with this email  : ${email}`,
              'warning',
            );
            return;

          }

          const { onVerifyEmail } = this.props;
          onVerifyEmail ? onVerifyEmail({ email }) :
            showMsg(`Sorry something went wrong: ${data.reason}`, 'warning');
        })
        .catch(err => {
          console.log('checkEmailVerification():err', err);
          this.setState({ isWorking: false });
          showMsg(
            `Sorry something went wrong : ${err.reason || ''}`,
            'warning',
          );
        });

      //forward email to verification screen

      return;
    } else if (verificationType !== 'email') {
      //validate phone number and forward to phone auth screen

      const phoneNumber = this.setPhoneNumber();

      if (!phoneNumber) {
        return;
      }

      //check if phone number exist on the system

      checkPhoneNumberVerification({ phoneNumber })
        .then(data => {
          this.setState({ isWorking: false });

          if (data && data.isError) {
            showMsg(`Error: ${data.reason}`, 'warning');
            return;
          } else if (data && data.status === null) {
            showMsg(
              `Sorry no record found with this phone number : ${phoneNumber}`,
              'warning',
            );
            return;
          }

          const { onVerifyPhone } = this.props;
          onVerifyPhone
            ? onVerifyPhone({ phoneNumber })
            : showMsg(
              `Sorry something went wrong: ${data.reason}`,
              'warning',
            );
        })
        .catch(err => {
          console.log('checkPhoneNumberVerification():err', err);

          this.setState({ isWorking: false });
          showMsg(`Sorry something went wrong : ${err.reason}`, 'warning');
        });
    } else {
      showMsg(`Sorry invalid input`, 'danger');
      this.setState({ isWorking: false });
    }
  }

  renderPhoneInput() {
    return (
      <React.Fragment>
        <PhoneInput
          textProps={{ placeholder: `your phone number` }}
          style={styles.phoneInputWrapper}
          initialCountry={`zm`}
          offset={10}
          onPressConfirm={() => this.setCountryCode()}
          textProps={{
            returnKeyType: 'done',
            placeholder: `Your phone number`,
            onSubmitEditing: () => { },
          }}
          ref={ref => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
        />
      </React.Fragment>
    );
  }

  renderFields() {

    const { fields } = this.state;

    return fields.map((field, index) => (
      <ListItem key={index} style={styles.inputContainer}>
        <Body key={index}>
          <Item style={styles.inputContainer} stackedLabel>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            {(field.type === 'phoneNumber' &&
              this.renderPhoneInput({ field })) || (
                <Input
                  // keyboardType={'phone-pad'}
                  style={styles.input}
                  placeholder={field.placeholder}
                  maxLength={30}
                  onChangeText={txt => this.onChangeText(field.name, txt)}
                />
              )}
          </Item>
        </Body>
      </ListItem>
    ));
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 10;
    const { verificationType } = this.props;
    const { isWorking } = this.state;

    return (
      <KeyboardAvoidingView
        style={APP_STYLES.keyboard}
        behavior="height"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Container>
          {isWorking && <Spinner color={APP_SECONDARY_COLOR} />}

          <Content>
            <Root>
              <Thumbnail
                style={styles.formAvartar}
                large
                source={require('../../assets/images/logo.png')}
              />

              {/* <Text style={styles.loginText}>Login</Text> */}
              {this.renderFields({ verificationType })}
              <Button
                disabled={isWorking}
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: (isWorking && 'grey') || APP_PRIMARY_COLOR,
                  },
                ]}
                title="Submit"
                onPress={() => this.submit()}>
                <Text style={styles.submitBtnText}>Request</Text>
              </Button>

              <Row>
                <Left>
                  <Text
                    style={styles.createAccTxt}
                    onPress={() => this.props.showCreateAccountScreen()}>
                    Create Account
                  </Text>
                </Left>

                <Right>
                  <Text
                    style={styles.createAccTxt}
                    onPress={() => this.props.forgotPwd()}>
                    Forgot Password
                  </Text>
                </Right>
              </Row>
              <Body>
                <Item>
                  <Text
                    style={styles.loginText}
                    onPress={() => this.props.showLoginScreen()}>
                    Login
                  </Text>
                </Item>
              </Body>
            </Root>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

export default withTracker(params => {
  return {};
})(VerificationForm);

