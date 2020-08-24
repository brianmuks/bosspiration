/**  @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import { LOGIN_FIELDS, FORGOT_PASSWORD_FIELDS } from "./constants";
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
  Row,
  Root
} from "native-base";
import {
  login,
  sendVerificationEmail,
  updateProfile,
  loginWithEmail,
  loginWithPhoneNumber,
  sendVerificationCode
} from "./Methods";
import { Alert } from "react-native";
import { saveData } from "../../state/preferences";
import { USER_ID } from "../../Constants";
import styles from "./Styles";
import firebase from "react-native-firebase";
import { showMsg, validateEmail } from "../../utils";
import PhoneAuth from "./PhoneAuth";
import EmailAuth from "./EmailAuth";
import PropTypes from 'prop-types'; // ES6

type Props = {};
class ForgotPassword extends Component<Props> {
  constructor() {
    super();
    self = this;
    this.state = {
      password: null,
      userName: null,
      isShowVerificationScreen: false
    };
  }

  componentDidMount() { }

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

  _sendResetCode() {
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

    const email = this.state.email.toString().trim();
    sendResetCode({ email })
      .then(data => {
        if (data && data.isError)
          return showMsg(`Sorry, ${data.msg}`, "danger");
        showMsg("Please check your email for the reset code");
      })
      .catch(err => {
        console.warn(err, "err");
        showMsg("Error: Sorry error occured", "danger");
      });
  }

  renderForm() {
    return FORGOT_PASSWORD_FIELDS.map((field, index) => (
      <ListItem key={index}>
        <Body>
          <Item stackedLabel>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            <Input
              placeholder={""}
              maxLength={30}
              value={this.state[field.name]}
              style={styles.input}
              onChangeText={txt => this.onChangeText(field.name, txt)}
            />
          </Item>
        </Body>
      </ListItem>
    ));
  }

  renderVerificationScreen() {
    const { userName } = this.state;

    if (validateEmail(userName)) {
      return (
        <EmailAuth
          email={userName}
          onCancel={() => {
            this.setState({ isShowVerificationScreen: false });
          }}
          onVerify={() => {
            this.setState({ isShowVerificationScreen: false });
          }}
        />
      );
    } else {
      return (
        <PhoneAuth
          phoneNumber={userName}
          onCancel={() => {
            this.setState({ isShowVerificationScreen: false });
          }}
          onVerify={() => {
            this.setState({ isShowVerificationScreen: false });
          }}
        />
      );
    }
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 100;

    return (
      <Container>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Content>
            <Root>
              <Thumbnail
                style={styles.formAvartar}
                large
                source={require("../../assets/images/logo.png")}
              />

              <Text style={styles.loginText}>Reset Password</Text>

              {!this.state.isShowVerificationScreen && this.renderForm()}
              <Button
                style={styles.submitBtn}
                title="Submit"
                onPress={() => this._sendResetCode()}
              >
                <Text style={styles.submitBtnText}>Reset</Text>
              </Button>

              <Row>
                <Left>
                  <Text
                    style={styles.createAccTxt}
                    onPress={() => this.props.showLoginScreen()}
                  >
                    Login
                  </Text>
                </Left>

                <Right>
                  <Text
                    style={styles.createAccTxt}
                    onPress={() => this.props.showCreateAccountScreen()}
                  >
                    Create Account
                  </Text>
                </Right>
              </Row>

              {this.state.isShowVerificationScreen &&
                this.renderVerificationScreen()}
            </Root>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default withTracker(params => {
  // Meteor.subscribe('user');
  const driver = Meteor.userId();
  return {};
})(ForgotPassword);

