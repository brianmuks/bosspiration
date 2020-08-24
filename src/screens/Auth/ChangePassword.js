/**  @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import { LOGIN_FIELDS, CHANGE_PASSWORD_FIELDS } from "./constants";
import {
  Container,
  Button,
  Content,
  Item,
  Input,
  Label,
  Root,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Spinner,
  Thumbnail,
  Row
} from "native-base";
import {
  changeUserPasswordByEmail,
  validatePassword
} from "./Methods";
import { Alert } from "react-native";
import { saveData } from "../../state/preferences";
import { USER_ID, APP_SECONDARY_COLOR } from "../../constants";
import styles from "./Styles";
import { showMsg, validateEmail, getConnectionStatus } from "../../utils";

type Props = {};
class ChangePassword extends Component<Props> {
  constructor() {
    super();
    self = this;
    this.state = {
      password: null,
      userName: null,
      isShowVerificationScreen: false,
      isWorking: false,
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

  submit() {
    for (let index = 0; index < CHANGE_PASSWORD_FIELDS.length; index++) {
      const field = CHANGE_PASSWORD_FIELDS[index];
      if (
        !this.state[field.name] ||
        this.state[field.name].trim().length === 0
      ) {
        Alert.alert(`Sorry ${field.label} can't be empty`);
        return;
      }
    }

    const { password, password2 } = this.state;

    if (!validatePassword({ password, password2 })) return;

    if (!getConnectionStatus())
      return showMsg("Sorry connection problem", "danger");
    this.setState({ isWorking: true });
    const { email } = this.props;

    changeUserPasswordByEmail({ password, email })
      .then(data => {

        if (data && data.isError) {
          this.setState({ isWorking: false });

          return showMsg(`Sorry, ${data.reason}`, "danger");
        }
        this.setState({ isWorking: false });
        //  showMsg('Password changed!')
        this.props.showLoginScreen();
      })
      .catch(err => {
        showMsg("Error: sorry something went wrong");
        this.setState({ isWorking: false });
        console.log("changeUserPasswordByEmail():err", err);
      });

  }

  renderForm() {
    return CHANGE_PASSWORD_FIELDS.map((field, index) => (
      <ListItem key={index}>
        <Body>
          <Item stackedLabel>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            <Input
              placeholder={""}
              maxLength={30}
              secureTextEntry
              value={this.state[field.name]}
              style={styles.input}
              onChangeText={txt => this.onChangeText(field.name, txt)}
            />
          </Item>
        </Body>
      </ListItem>
    ));
  }



  render() {

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 100;

    const { isWorking } = this.state;
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
                source={require('../../assets/images/logo.png')}
              />
              {isWorking && <Spinner color={APP_SECONDARY_COLOR} />}

              <Text style={styles.loginText}>Change Password</Text>

              {!this.state.isShowVerificationScreen && this.renderForm()}
              <Button
                style={styles.submitBtn}
                title="Submit"
                onPress={() => this.submit()}>
                <Text style={styles.submitBtnText}>Submit</Text>
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
                    onPress={() => this.props.showLoginScreen()}>
                    Login
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
})(ChangePassword);

