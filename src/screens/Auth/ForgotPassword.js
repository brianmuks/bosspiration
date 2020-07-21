/**  @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import {FORGOT_PASSWORD_FIELDS, VERIFY_CODE_FIELDS } from "./constants";
import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Spinner,
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
  Row,
  Root
} from "native-base";
import {
  login,
  sendVerificationEmail,
  updateProfile,
  loginWithEmail,
  loginWithPhoneNumber,
  verifyResetCode,
  sendResetCode
} from "./Methods";
import { Alert } from "react-native";
import { saveData } from "../../state/preferences";
import { USER_ID, APP_PRIMARY_COLOR, APP_SECONDARY_COLOR } from "../../constants";
import styles from "./Styles";
import { showMsg, validateEmail, getConnectionStatus } from "../../utils";
import PhoneAuth from "./PhoneAuth";
import EmailAuth from "./EmailAuth";
import PropTypes from 'prop-types'; // ES6
import APP_STYLES from '../../constants/Styles';


type Props = {};
class ForgotPassword extends Component<Props> {
  constructor() {
    super();
    self = this;
    this.state = {
      password: null,
      userName: null,
      isShowVerificationScreen: false,
      isCodeSent: false,
      isWorking: false,
      isResend: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    //  this.onTokenRefreshListener();
  }

  onChangeText = (key, txt) => {
    const state = {};
    state[key] = txt;
    this.setState(state);
  };

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

  _verifyCode() {
    for (let index = 0; index < VERIFY_CODE_FIELDS.length; index++) {
      const field = VERIFY_CODE_FIELDS[index];
      if (
        !this.state[field.name] ||
        this.state[field.name].trim().length === 0
      ) {
        showMsg(`Sorry ${field.label} can't be empty`, "danger");
        return;
      }
    }

    if (!getConnectionStatus())
      return showMsg("Sorry connection problem", "danger");

    let { resetCode } = this.state;
    resetCode = resetCode.toString().trim();

    this.setState({ isWorking: true });

    verifyResetCode({ resetCode })
      .then(data => {
        this.setState({ isWorking: false });

        if (data && data.isError) {
          return showMsg(`Sorry, ${data.msg}`, "danger");
        } else if (data === 0) {
          this.setState({ isResend: true  });
          return showMsg(`Sorry, code is invalid or has expired`, "danger");
        }

        showMsg("Please proceed to change password");
        let { email } = this.state;

        this.props.showChangePwdScreen({ email });
        this.setState({ isCodeSent: false });
      })

      .catch(err => {
        this.setState({ isWorking: false });

        console.warn(err, "err");
        showMsg("Error: Sorry error occured", "danger");
      });
  }

  submit({ isResend }) {
    //Todo: limit the number of reset in a day

    const { isCodeSent } = this.state;

    if (isCodeSent && !isResend) {
      this._verifyCode();
      return;
    }

    for (let index = 0; index < FORGOT_PASSWORD_FIELDS.length; index++) {
      const field = FORGOT_PASSWORD_FIELDS[index];
      if (
        !this.state[field.name] ||
        this.state[field.name].trim().length === 0
      ) {
        showMsg(`Sorry ${field.label} can't be empty`, "danger");
        return;
      }
    }

    if (!getConnectionStatus())
      return showMsg("Sorry connection problem", "danger");

    let { email } = this.state;
    email = email.toString().trim();
    if (!validateEmail(email))
      return showMsg("Sorry email is invalid", "danger");
    this.setState({ isWorking: true });

    sendResetCode({ email })
      .then(data => {
        this.setState({ isWorking: false });

        if (data && data.isError)
          return showMsg(`Sorry, ${data.msg}`, "danger");

        showMsg("Please check your email for the reset code");
        this.setState({ isCodeSent: true,email:'', isResend: false });
      })

      .catch(err => {
        this.setState({ isWorking: false });

        console.warn(err, "err");
        showMsg("Error: Sorry error occured", "danger");
      });
  }

  renderForm() {
    const { isCodeSent } = this.state;
    const fields = isCodeSent ? VERIFY_CODE_FIELDS : FORGOT_PASSWORD_FIELDS;

    return fields.map((field, index) => (
      <ListItem key={index} style={styles.inputContainer}>
        <Body key={index}>
          <Item style={styles.inputContainer} stackedLabel>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            {(field.type === 'select' && this.renderPicker({field})) ||
              (field.type === 'date' && this.renderDatePicker({field})) || (
                <Input
                  style={APP_STYLES.input}
                  secureTextEntry={(field.type === 'password' && true) || false}
                  disabled={
                    field.name == 'email' && this.props.userId ? true : false
                  }
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
    const { isCodeSent, isWorking, isResend } = this.state;
    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 100;

    return (
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior="height"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Container>
          <Content>
            <Root>
              <Thumbnail
                style={styles.formAvartar}
                large
                source={require('../../images/logo.png')}
              />
              {isWorking && <Spinner color={APP_SECONDARY_COLOR} />}

              <Text style={styles.resetText}>Reset Password</Text>

              {!this.state.isShowVerificationScreen && this.renderForm()}
              <Button
                style={styles.submitBtn}
                title="Submit"
                onPress={() => this.submit({})}>
                <Text style={styles.submitBtnText}>{`${(isCodeSent &&
                  'verify') ||
                  'Reset'}`}</Text>
              </Button>
              <Text
                style={styles.createAccTxt}
                onPress={() => this.submit({isResend: true})}>
                Resend Code
              </Text>

              <Row>
                <Left>
                  <Text
                    style={styles.createAccTxt}
                    onPress={() => this.props.showLoginScreen()}>
                    Login
                  </Text>
                </Left>

                <Right>
                  <Text
                    style={styles.createAccTxt}
                    onPress={() => this.props.showCreateAccountScreen()}>
                    Create Account
                  </Text>
                </Right>
              </Row>
            </Root>
          </Content>
      </Container>
        </KeyboardAvoidingView>
    );
  }
}

export default withTracker(params => {
  // Meteor.subscribe('user');
  const driver = Meteor.userId();
  return {};
})(ForgotPassword);

