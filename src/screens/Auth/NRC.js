/**  @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import { FIELDS, NRC_FIELDS } from "./constants";
import {
  Container,
  Header,
  Root,
  Button,
  Content,
  Form,
  Item,
  Picker,
  DatePicker,
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
  Thumbnail
} from "native-base";
import { register, updateProfile, pickImage, uploadFile } from "./Methods";
import { Alert } from "react-native";
import { saveData } from "../../state/preferences";
import { IS_ACCOUNT_CREATED, COLLECTIONS } from "../../Constants";
import styles from "./Styles";
import { showMsg, validateEmail } from "../../utils";

type Props = {};
class NRC extends Component<Props> {
  constructor() {
    super();

    this.state = {
      isLogin: false,
      isUserInforUpdated: false,
      fname: null,
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

  componentDidMount() { }

  onChangeText = (key, val) => {
    //update states so that they can be validated on submit. applies when updating profile
    const state = {};
    state[key] = val;
    this.setState(state);
  };

  formSubmitted({ formType, formId }) {
    Alert.alert("Done", "Will soon get back to you", [
      {
        text: "OK",
        onPress: () => console.warn(formType, formId)
      }
    ]);
  }

  _uploadFiles({ files }) {
    let counter = 0;
    const _id = Meteor.userId();
    for (const key in files) {
      const image = {
        name: key,
        file: files[key].value,
        label: files[key].label
      };
      console.warn(image.name);



      uploadFile({ image, _id, collection: COLLECTIONS.USERS })
        .then(res => {
          const uploadedText = ++counter + "/" + Object.keys(files).length;
          this.setState({ uploadedText });
          showMsg(`${image.label} successfuly uploaded`);
        })
        .catch(err => {
          console.log(err)
          showMsg(`sorry ${image.label} failed to upload `);
          //TODO: on retry remove saved files on db
        });
    }
  }



  submit() {
    let files = {};

    for (let index = 0; index < NRC_FIELDS.length; index++) {
      const field = NRC_FIELDS[index];
      if (
        !this.state[field.name]
      ) {
        Alert.alert(`Sorry ${field.label} is required`);
        return;
      } else {
        files[field.name] = {
          label: field.label,
          value: this.state[field.name]
        };
      }
    }


    console.warn(files);
    return;

    //upload files
    this._uploadFiles({ files });


  }

  _pickImage({ field }) {
    pickImage()
      .then(image => {
        console.log(image, field.name, "image");
        this.onChangeText(field.name, image);
        //  showMsg(image.path)
      })
      .catch(err => {
        showMsg(err);
      });
  }

  getFieldValue({ field }) {
    return (
      (this.state[field.name] && this.state[field.name]) ||
      (Meteor.user() &&
        field.name == "email" &&
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

  renderFileUploader({ field }) {
    console.log(this.state, "here");
    console.warn(this.state[field.name]);

    return (
      <Body>
        <Button
          style={styles.uploadTextm}
          onPress={() => this._pickImage({ field })}
        >
          <Text> Upload</Text>
        </Button>
        <Thumbnail
          style={styles.formAvartar}
          large
          source={{
            uri:
              (this.state[field.name] &&
                this.state[field.name].path &&
                this.state[field.name].path) ||
              //if action = edit > show uploaded file
              this.state[field.name] ||
              null
          }}
        />
      </Body>
    );
  }

  renderFields() {
    return NRC_FIELDS.map((field, index) => (
      <ListItem key={index}>
        <Body>
          <Item stackedLabel rounded>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            {(field.type === "select" && this.renderPicker({ field })) ||
              (field.type === "file" && this.renderFileUploader({ field })) ||
              (field.type === "date" && this.renderDatePicker({ field })) || (
                <Input
                  secureTextEntry={(field.type === "password" && true) || false}
                  disabled={
                    field.name == "email" && this.props.userId ? true : false
                  }
                  placeholder={"..."}
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

  renderLogin() {
    return (
      <Text
        style={styles.submitBtnText}
        style={styles.loginText}
        onPress={() =>
          (this.props.showLoginScreen && this.props.showLoginScreen()) ||
          this.showLoginScreen()
        }
      >
        Login
      </Text>
    );
  }

  renderSubmitBtn() {
    return <Text> {`${(this.props.userId && "Update") || "Upload"}`}</Text>;
  }

  render() {
    return (
      <Root>
        <Container>
          <Content>
            <Thumbnail
              style={styles.formAvartar}
              large
              source={require("../../assets/images/logo.png")}
            />

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
    );
  }
}

export default withTracker(params => {
  Meteor.subscribe("users");
  const _id = params.userId;
  return {
    user: Meteor.collection(COLLECTIONS.USERS).findOne({ _id })
  };
})(NRC);
