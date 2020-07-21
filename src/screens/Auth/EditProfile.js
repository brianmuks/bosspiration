/**  @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, ImageBackground, View} from 'react-native';
import Meteor, {withTracker} from 'react-native-meteor';
import {FIELDS, EDIT_PROFILE_FIELDS} from './constants';
import {
  Container,
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
  Thumbnail,
} from 'native-base';
import {register, updateProfile, pickImage} from './Methods';
import {Alert, KeyboardAvoidingView} from 'react-native';
import {saveData} from '../../state/preferences';
import {IS_ACCOUNT_CREATED, COLLECTIONS} from '../../constants';
import styles from './Styles';
import Login from './Login';
import {showMsg} from '../../utils';
import APP_STYLES from '../../constants/Styles';

type Props = {};
class EditAccount extends Component<Props> {
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
      photo: null,
      password: null,
      password2: null,
      gender: null,
      dob: null,
      user: {},
    };
  }

  UNSAFE_componentWillMount() {
    const {user} = this.props;
    console.warn(user);

    user &&
      this.setState({
        ...user.profile,
        email: (user.emails && user.emails[0].address) || '',
      });
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

    //get newcode or stored code if not don't update on main server
    const orgCode =
      profile.orgCode ||
      (Meteor.user() && Meteor.user().profile.orgCode) ||
      null;

    (Object.keys(profile).length &&
      updateProfile({profile, _id: this.props.userId, orgCode})
        .then(res => {
          if (res.isError) {
            Alert.alert('Sorry error occured ' + res.reason);

            return;
          }
          showMsg('Profile updated');
          this.props.onDone();
          // Alert.alert('Sorry error occured' + err.reason);
        })
        .catch(err => {
          console.log(err, 'updateProfile():err');

          Alert.alert('Sorry error occured ' + err.reason);
        })) ||
      this.props.onDone();
  }

  submit() {
    this.updateProfile();
  }

  getFieldValue({field, isDate}) {
    return this.state[field.name];
  }

  renderPickerOptions({options}) {
    return options.map((option, index) => (
      <Picker.Item key={index} label={option.label} value={option.value} />
    ));
  }

  renderPicker({field}) {
    return (
      <Picker
        note
        mode="dropdown"
        style={{width: '70%'}}
        selectedValue={this.getFieldValue({field})}
        onValueChange={value => this.onChangeText(field.name, value)}>
        <Picker.Item label={'Select'} value={null} />
        {this.renderPickerOptions({options: field.options})}
      </Picker>
    );
  }

  renderDatePicker({field}) {
    return (
      <DatePicker
        defaultDate={new Date(this.getFieldValue({field, isDate}))}
        minimumDate={new Date(1914, 6, 7)}
        maximumDate={new Date()}
        locale={'en'}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={'fade'}
        androidMode={'default'}
        placeHolderText="Select date"
        textStyle={{color: 'green'}}
        placeHolderTextStyle={{color: '#d3d3d3'}}
        onDateChange={value => this.onChangeText(field.name, value)}
        disabled={false}
      />
    );
  }

  _uploadFile({field}) {
    pickImage()
      .then(image => {
        console.log(image.path, 'image');
        // this.setState({ photo :image.path});
        this.onChangeText(field.name, image.path);
        //  showMsg(image.path)
      })
      .catch(err => {
        console.log(err, 'err');

        showMsg(err);
      });
  }

  renderFileUploader({field}) {
    console.log(this.state.photo);

    return (
      <Body>
        <Text
          style={styles.uploadText}
          onPress={() => this._uploadFile({field})}>
          Upload
        </Text>
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
              null,
          }}
        />
      </Body>
    );
  }

  renderFields() {
    return EDIT_PROFILE_FIELDS.map((field, index) => (
      <ListItem key={index}>
        <Body>
          <Item stackedLabel>
            <Label style={styles.fieldLabel}>{field.label}</Label>
            {(field.type === 'select' && this.renderPicker({field})) ||
              (field.type === 'file' && this.renderFileUploader({field})) ||
              (field.type === 'date' && this.renderDatePicker({field})) || (
                <Input
                  style={APP_STYLES.input}
                  secureTextEntry={(field.type === 'password' && true) || false}
                  disabled={
                    field.name == 'email' && this.props.userId ? true : false
                  }
                  placeholder={''}
                  maxLength={100}
                  value={this.getFieldValue({field})}
                  onChangeText={txt => this.onChangeText(field.name, txt)}
                />
              )}
          </Item>
        </Body>
      </ListItem>
    ));
  }

  showLoginScreen() {
    this.setState({isLogin: true});
  }

  renderLogin() {
    //    return !this.props.userId &&
    return (
      <Text
        style={styles.loginText}
        onPress={() =>
          (this.props.showLoginScreen && this.props.showLoginScreen()) ||
          this.showLoginScreen()
        }>
        Login
      </Text>
    );
    //    || null;
  }

  renderSubmitBtn() {
    return <Text> {`${(this.props.userId && 'Update') || 'Update'}`}</Text>;
  }

  render() {
    console.log('fieldValues', Meteor.user());
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 100;

    if (this.state.isLogin) {
      return <Login onLogin={() => this.setState({isLogin: false})} />;
    }

    return (
      <Root>
        <Container>
          <ImageBackground
            source={require('../../images/bkg/bkg3.jpg')}
            style={APP_STYLES._backgroundImage}>
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <Content>
                <Thumbnail
                  style={styles.formAvartar}
                  large
                  source={require('../../images/logo.png')}
                />

                <Form>
                  {this.renderFields()}
                  <Body>
                    <Item>
                      <Button
                        style={styles.submitBtn}
                        onPress={() => this.submit()}>
                        {this.renderSubmitBtn()}
                      </Button>
                    </Item>
                  </Body>
                </Form>
              </Content>
            </KeyboardAvoidingView>
          </ImageBackground>
        </Container>
      </Root>
    );
  }
}

export default withTracker(params => {
  Meteor.subscribe('users');
  const _id = params.userId;
  return {
    user: Meteor.collection(COLLECTIONS.USERS).findOne({_id}),
  };
})(EditAccount);
