/**  @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Alert, View, KeyboardAvoidingView} from 'react-native';
import Meteor, {withTracker} from 'react-native-meteor';
import {LOGIN_FIELDS, PHONE_VERIFICATION_FIELDS} from './constants';
import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Picker,
  Input,
  Label,
  CheckBox,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Thumbnail,
  Root,
  Toast,
} from 'native-base';
import {
  login,
  sendPhoneVerificationCode,
  updateProfile,
  verifyPhonecode,
  updatePhoneNumberStatus,
} from './Methods';
import {saveData} from '../../state/preferences';
import {
  USER_ID,
  IS_PHONE_NUMBER_VERIFIED,
  APP_PRIMARY_COLOR,
} from '../../constants';
import styles from './Styles';
import {showMsg} from '../../utils';
import PropTypes from 'prop-types'; // ES6
import Appstyles, {keyboardVerticalOffset} from '../../constants/Styles';
import auth,{firebase} from '@react-native-firebase/auth';
import APP_STYLES from '../../constants/Styles';


type Props = {};
class PhoneAuth extends Component<Props> {
  constructor(props) {
    super();
    this.state = {
      phoneNumber: props.phoneNumber,
      code: null,
      phoneCode: null,
      isResendVerificationCode: false,
      timer: 0, //seconds
      showCounter: true,
      count: 30,
      isWorking: false,
    };
    this.interval = '';
  }

  componentDidMount() {
    this._onAuthStateChanged();
  }

  

  runClock() {
    this.interval = setInterval(() => {
      const timer = this.state.timer - 1;

      timer > -1 && this.setState({timer});
    }, 1000);
  }

  _onAuthStateChanged() {

    auth().onAuthStateChanged(user => {
      if (user) {
        const {phoneNumber} = this.props;
     
        updatePhoneNumberStatus({phoneNumber, status: true})
          .then(resp => {
            this.props.onActivated();

            //All good
          })
          .catch(err => console.log(err, 'updatePhoneNumberStatus():Error'));


        return;
      } // user is verified and logged in
      else{
        this._sendVerificatinCode();

      }
    });
  }



  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeText = (key, txt) => {
    const state = {};
    state[key] = txt;
    this.setState(state);
  };

  _sendVerificatinCode() {
    console.log(this.props.phoneNumber, 'this.props.phoneNumber');

    const {phoneNumber, timer} = this.state;

    if (timer !== 0) {
      const msg = 'Please wait';
      return showMsg(msg, 'warning');
    }else if (!phoneNumber){
      return ;//
    }

    
            sendPhoneVerificationCode({phoneNumber})
              .then(({confirmResult}) => {
                const msg = 'Please wait for a verification code';
                showMsg(msg);

                this.setState({confirmResult, timer: 60});
                this.runClock();
              })
              .catch(err => {
                const msg = err.reason;
                showMsg(msg);
              });
  }

  verifyPhoneCode() {
    const {phoneCode, confirmResult, isWorking} = this.state;
    const {phoneNumber, onActivated} = this.props;
    if (isWorking) {
      return showMsg('Please wait');
    } else if (!phoneCode || !phoneCode > 0) {
      return;
    }

    this.setState({isWorking: true});
    verifyPhonecode({phoneCode, confirmResult, phoneNumber})
      .then(({msg}) => {
        //Todo: save phonenumber
        saveData(IS_PHONE_NUMBER_VERIFIED, 'true'); //we are good to login
        this.setState({isWorking: false});
        //update status on db to allow login
        updatePhoneNumberStatus({phoneNumber, status: true})
          .then(resp => {
            //All good
          })
          .catch(err => console.log(err, 'updatePhoneNumberStatus():Error'));
        //NOTE: we still proceed to login. we have already store the phoneNumber
        //on the device. we can use this to auto change the status on db

        //TODO: switch to login
        onActivated();

        //  Alert.alert('Done',msg);
        return;
      })
      .catch(err => {
        console.log(err);
        this.setState({isResendVerificationCode: true, isWorking: false});
        showMsg(err.reason, 'danger');
        return;
      });
  }

  renderVerificationForm() {
    return PHONE_VERIFICATION_FIELDS.map((field, index) => (
      <Body stackedLabel key={`verification-form-input-${index}`}>
        <Label style={styles.fieldLabel}>{field.label}</Label>
        <Item >
          <Input
            style={APP_STYLES.input}
            placeholder={field.placeholder}
            maxLength={6}
            keyboardType={'number-pad'}
            value={this.state[field.name]}
            onChangeText={txt => this.onChangeText(field.name, txt)}
          />
        </Item>
      </Body>
    ));
  }

  render() {
    const {phoneNumber} = this.props;

    const {timer, isWorking, phoneCode} = this.state;
    timer === 0 ? clearInterval(this.interval) : '';

    return (
      <KeyboardAvoidingView
        style={Appstyles.keyboard}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Container>
          {isWorking && <Spinner color={APP_SECONDARY_COLOR} />}
          <Content>
            <Root>
              <Thumbnail
                style={styles.formAvartar}
                large
                source={require('../../images/logo.png')}
              />
              <Form>
                {this.renderVerificationForm()}
                <Body>
                  <Item>
                    <Button
                      style={[
                        styles.submitBtn,
                        {
                          backgroundColor:
                            isWorking ||
                            (!phoneCode > 0 && 'grey') ||
                            APP_PRIMARY_COLOR,
                        },
                      ]}
                      title="Submit"
                      onPress={() => this.verifyPhoneCode()}>
                      <Text style={styles.submitBtnText}>Verify</Text>
                    </Button>
                  </Item>
                </Body>
                <Text note style={{alignSelf: 'center'}}>
                  {`Phone Number: ${phoneNumber || 'NOT SET'}`}
                </Text>
                <Body>
                  <Item>
                    {(phoneNumber && (
                      <Button
                        style={[
                          styles.submitBtn,
                          {
                            backgroundColor:
                              (timer && 'grey') || APP_PRIMARY_COLOR,
                          },
                        ]}
                        title="Submit"
                        onPress={() => this._sendVerificatinCode()}>
                        <Text style={[styles.submitBtnText]}>
                          Resend Verification code
                        </Text>
                      </Button>
                    )) ||
                      null}
                    <Text note>{`${timer || ''}`}</Text>
                  </Item>

                  <Item>
                    <Text
                      style={styles.verifyPromptText}
                      onPress={() =>
                        this.props.showVerificationFormScreen({
                          promptVerification: true,
                          type: 'email',
                        })
                      }>
                      Verify email address instead ?
                    </Text>
                  </Item>

                  <Item>
                    <Text
                      style={styles.loginText}
                      onPress={() => this.props.showLoginScreen()}>
                      Login
                    </Text>
                  </Item>
                </Body>
              </Form>
            </Root>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

export default withTracker(params => {
  // Meteor.subscribe('user');
  return {};
})(PhoneAuth);

PhoneAuth.propTypes = {
  // phoneNumber: PropTypes.string.isRequired,
  onActivated: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
