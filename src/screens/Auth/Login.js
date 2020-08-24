/**  @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { LOGIN_FIELDS } from './constants';
import { Container, Header, Button, Content, Form, Item, Picker, Input, Label, Spinner, ListItem, Text, Icon, Left, Body, Right, Thumbnail, Root } from 'native-base';
import { login, sendVerificationEmail, updateProfile } from './Methods';
import { Alert } from 'react-native';
import { USER_ID, APP_PRIMARY_COLOR } from '../../Constants';
import styles from './Styles'
import firebase from 'react-native-firebase';
import { showMsg } from '../../utils';
// import TopSpinner from '../../utils/TopSpinner';
import Appstyles from "../../Constants/Styles";


type Props = {};
class Login extends Component<Props> {

  constructor() {
    super();
    self = this;
    this.state = {
      password: null,
      email: null,
      isWorking: false,
      showReverification: false,
      topSpinnerVisibility: false,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then((user) => {
        console.log(user.isAnonymous);
      }).catch(err => {
        console.log('firebase.auth():ERRO', err);

      });
  }

  componentWillUnmount() {
    //  this.onTokenRefreshListener();
  }


  onChangeText = (key, txt) => {
    const state = {};
    state[key] = txt;
    this.setState(state)
  }

  _sendVerificationEmail() {
    this.setState({ topSpinnerVisibility: true });

    sendVerificationEmail({ email: this.state.email })
      .then(resp => {
        const msg = 'Please check your email for further instructions';
        Alert.alert(msg);
        this.setState({ topSpinnerVisibility: false });

      })
      .catch(err => {
        const msg = err.reason;
        Alert.alert(msg);
        this.setState({ topSpinnerVisibility: false });

      })
  }

  login() {
    for (let index = 0; index < LOGIN_FIELDS.length; index++) {
      const field = LOGIN_FIELDS[index];
      if (
        !this.state[field.name] ||
        this.state[field.name].trim().length === 0
      ) {
        Alert.alert(`Sorry ${field.label} can't be empty`);
        this.setState({ topSpinnerVisibility: false });

        return;
      }
    }
    const details = {
      email: this.state.email.toString().trim(),
      password: this.state.password
    };
    this.setState({ isWorking: true });

    login(details)
      .then(resp => {
        this.setState({ isWorking: false });

        if (Meteor.user().profile.role === "user") {
          showMsg(
            "Error: Sorry there is a problem with your account",
            "danger"
          );
          return;
        }

        console.log(Meteor.userId(), "Meteor.userId()");

        saveData(USER_ID, Meteor.userId())
          .then(res => {
            this.props.onLogin();
            this.setState({ topSpinnerVisibility: false });
          })
          .catch(err => {
            Alert.alert("Error", "Sorry error occured");
            console.log("failed to save userID =>STRANGE!", err);
            this.setState({ topSpinnerVisibility: false });
          });

        //we do this for faster authentication on nexl launch
      })
      .catch(err => {
        this.setState({ isWorking: false });

        const msg = err.reason;
        console.warn(err, "err");
        this.setState({ topSpinnerVisibility: false });

        Alert.alert("Error", msg);
        err.code === 405 &&
          this.setState({ showReverification: true });
      });
  }

  renderLogin() {
    return LOGIN_FIELDS.map((field, index) => (
      <ListItem key={index} >
        <Body>
          <Item stackedLabel>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            <Input secureTextEntry={index && true || false}
              style={Appstyles.input}

              placeholder={''} maxLength={30}
              value={this.state[field.name]} onChangeText={txt => this.onChangeText(field.name, txt)} />
          </Item>
        </Body>
      </ListItem>
    ))
  }


  render() {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 90;

    const { topSpinnerVisibility, isWorking } = this.state;

    return (
      <KeyboardAvoidingView
        style={Appstyles.keyboard}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Root>
          <Container>
            <Content>
              {/* <TopSpinner visibility={topSpinnerVisibility} index={6} /> */}

              <Thumbnail
                style={styles.formAvartar}
                large
                source={require("../../assets/images/logo.png")}
              />
              {isWorking && <Spinner color="green" />}

              <Text
                style={styles.loginText}
                onPress={() => this.props.showCreateAccountScreen()}
              >
                Create Account
                  </Text>
              <Form>
                {this.renderLogin()}

                <Body>
                  <Item>
                    <Button
                      style={styles.submitBtn}
                      onPress={() => this.login()}
                    >
                      <Text style={styles.submitBtnText}>Login</Text>
                    </Button>
                  </Item>
                </Body>

                {this.state.showReverification && (
                  <Body>
                    <Item>
                      <Button
                        style={styles.submitBtn}
                        title="Submit"
                        onPress={() => this._sendVerificationEmail()}
                      >
                        <Text style={styles.submitBtnText}>
                          Send Verification code
                            </Text>
                      </Button>
                    </Item>
                  </Body>
                )}
              </Form>
            </Content>
          </Container>
        </Root>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
