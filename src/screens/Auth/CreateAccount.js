/**  @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Meteor, { withTracker } from 'react-native-meteor';
import { FIELDS, EDIT_PROFILE_FIELDS } from './constants';
import { Container, Header,Root, Button, Content, Form, Item, Picker,DatePicker, Input, Label, CheckBox, ListItem, Text, Icon, Left, Body, Right, Switch, Thumbnail } from 'native-base';
import { register, updateProfile, logout } from './Methods';
import { Alert } from 'react-native';
import { saveData } from '../../state/preferences';
import { IS_ACCOUNT_CREATED, COLLECTIONS } from '../../Constants';
import styles from './Styles'
import Login from './Login';
import { showMsg } from '../../utils';
import TopSpinner from '../../utils/TopSpinner';
import Appstyles, { keyboardVerticalOffset } from "../../Constants/Styles";



type Props = {};
  class CreateAccount extends Component<Props> {
    constructor() {
      super();

      this.state = {
        isLogin: false,
        isUserInforUpdated: false,
        fname: null,
        topSpinnerVisibility: false,
        lname: null,
        email: null,
        phone: null,
        nrc: null,
        password: null,
        password2: null,
        gender: null,
        dob: null
      };
    }

    componentDidMount() {}

    onChangeText = (key, txt) => {
      //update states so that they can be validated on submit. applies when updating profile
      const state = {};
      state[key] = txt.toString();
      this.setState(state);
    };

    updateProfile() {
      let profile = {};
      for (let index = 0; index < EDIT_PROFILE_FIELDS.length; index++) {
        const field = EDIT_PROFILE_FIELDS[index];

        console.log(this.state[field.name]);

        if (
          this.state[field.name] &&
          this.state[field.name].toString().trim().length !== 0
        ) {
          //get only affected valid fields
          profile[field.name] = this.state[field.name];
        } else if (
          this.state[field.name] &&
          this.state[field.name].trim().length == 0
        ) {
          //field edited to empty > ''
          Alert.alert(`Sorry ${field.label} can't be empty`);
          return;
        }
      }

      Object.keys(profile).length &&
        updateProfile({ profile, _id: this.props.userId })
          .then(res => {
            showMsg("Profile updated");
            // Alert.alert('Sorry error occured' + err.reason);
            this.setState({ topSpinnerVisibility: false });
          })
          .catch(err => {
            Alert.alert("Sorry error occured" + err.reason);
            this.setState({ topSpinnerVisibility: false });
          });
    }

    submit() {
      this.setState({ topSpinnerVisibility: true });
      if (this.props.userId) {
        //update profile
        this.updateProfile();
        return;
      }

      for (let index = 0; index < FIELDS.length; index++) {
        const field = FIELDS[index];

        if (
          !this.state[field.name] ||
          this.state[field.name].trim().length === 0
        ) {
          Alert.alert(`Sorry ${field.label} can't be empty`);
          this.setState({ topSpinnerVisibility: false });

          return;
        }
      }

      const profile = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        gender: this.state.gender,
        nrc: this.state.nrc,
        createdAt: new Date(),
        dob: this.state.dob,
        role: "user"
      };

      const user = {
        email: this.state.email,
        password: this.state.password
      };

      register({ profile, user })
        .then(resp => {
          saveData(IS_ACCOUNT_CREATED, "true");
          this.setState({ topSpinnerVisibility: false });

          Alert.alert(
            "Done",
            "Account created. Check your email for verification",
            [{ text: "OK", onPress: () => this.props.onAccountCreated() }]
          );
        })
        .catch(err => {
          Alert.alert("Sorry error occured" + err.reason);
          this.setState({ topSpinnerVisibility: false });
        });
    }

    getFieldValue({ field }) {
      return (
        (this.state[field.name] && this.state[field.name]) ||
        (Meteor.user() &&
          field.name == "email" &&
          Meteor.user().emails &&
          Meteor.user().emails[0].address) ||
        (Meteor.user() && Meteor.user().profile[field.name]) ||
        null
      );
    }

    renderPickerOptions({ options }) {
      return options.map((option, index) => (
        <Picker.Item key={index} label={option.label} value={option.value} />
      ));
    }

    renderPicker({ field }) {
      return (
        <Picker
          note
          mode="dropdown"
          style={{ width: "70%" }}
          selectedValue={this.getFieldValue({ field })}
          onValueChange={value => this.onChangeText(field.name, value)}
        >
          <Picker.Item label={"Select"} value={null} />
          {this.renderPickerOptions({ options: field.options })}
        </Picker>
      );
    }

    renderDatePicker({ field }) {
      return (
        <DatePicker
          defaultDate={new Date(this.getFieldValue({ field }))}
          minimumDate={new Date(1914, 6, 7)}
          maximumDate={new Date()}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Select date"
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          onDateChange={value => this.onChangeText(field.name, value)}
          disabled={false}
        />
      );
    }

    renderFields() {
      return FIELDS.map((field, index) => (
        <ListItem key={index}>
          <Body>
            <Item stackedLabel >
              <Label style={styles.fieldLabel}>{field.label}</Label>
              {(field.type === "select" && this.renderPicker({ field })) ||
                (field.type === "date" && this.renderDatePicker({ field })) || (
                  <Input
                  style={Appstyles.input}
                    secureTextEntry={
                      (field.type === "password" && true) || false
                    }
                    disabled={
                      field.name == "email" && this.props.userId ? true : false
                    }
                    placeholder={""}
                    maxLength={30}
                    value={this.getFieldValue({ field })}
                    onChangeText={txt => this.onChangeText(field.name, txt)}
                  />
                )}
            </Item>
          </Body>
        </ListItem>
      ));
    }

    showLoginScreen() {
      this.setState({ isLogin: true });
    }

    _logout(){

        logout()
        .then()
        .catch()
        

    }

    renderLogin() {
      return (
        (!this.props.userId && (
          <Text
            style={styles.loginText}
            onPress={() =>
              (this.props.showLoginScreen && this.props.showLoginScreen()) ||
              this.showLoginScreen()
            }
          >
            Login
          </Text>
        )) || (
          <Text onPress={() => this._logout()} style={styles.loginText}>
            Logout
          </Text>
        )
      );
    }

    renderSubmitBtn() {
      return <Text> {`${(this.props.userId && "Update") || "Create"}`}</Text>;
    }

    render() {
      console.log("fieldValues", Meteor.user());
      const { topSpinnerVisibility } = this.state;

      if (this.state.isLogin) {
        return <Login onLogin={() => this.setState({ isLogin: false })} />;
      }

      return (
        <KeyboardAvoidingView
          style={Appstyles.keyboard}
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Root>
            <Container>
              <Content>
                <TopSpinner visibility={topSpinnerVisibility} index={6} />

                <Thumbnail
                  style={styles.formAvartar}
                  large
                  source={require("../../images/logo.png")}
                />

                {this.renderLogin()}
                <Form>
                  {this.renderFields()}
                  <Body>
                    <Item>
                      <Button
                        style={styles.submitBtn}
                        onPress={() => this.submit()}
                      >
                        {this.renderSubmitBtn()}
                      </Button>
                    </Item>
                  </Body>
                </Form>
              </Content>
          </Container>
        </Root>
            </KeyboardAvoidingView>
      );
    }
  }


export default withTracker(params => {
    Meteor.subscribe('users');
    const _id = params.userId;
    return  {
            user: Meteor.collection(COLLECTIONS.USERS).findOne({_id}),
    } 

})(CreateAccount);
