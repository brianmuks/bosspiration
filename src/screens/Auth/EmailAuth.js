/**  @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Alert, View, KeyboardAvoidingView } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import { LOGIN_FIELDS, PHONE_VERIFICATION_FIELDS, EMAIL_VERIFICATION_FIELDS } from './constants';
import { Container, Header, Button, Content, Form, Item, Picker, Input, Label, CheckBox, ListItem, Text, Icon, Left, Body, Right, Root, Thumbnail, Spinner } from 'native-base';
import {  login, sendVerificationEmail, updateProfile, verifyEmailCode } from './Methods';
import { saveData } from '../../state/preferences';
import { USER_ID, APP_PRIMARY_COLOR } from '../../constants';
import styles from './Styles'
import { showMsg } from '../../utils';
import PropTypes from 'prop-types'; // ES6




type Props = {};
 class EmailAuth extends Component<Props> {
   constructor(props) {
     super();
     this.state = {
       email: props.email,
       isWorking: false,
       timer: 0, //seconds
       verificationCode: null,
       isResendVerificationCode: false,
     };
     this.interval = '';
   }

   componentDidMount() {
     this._sendVerificatinCode();
   }

   runClock() {
     this.interval = setInterval(() => {
       const timer = this.state.timer - 1;

       timer > -1 && this.setState({timer});
       timer === 0 && this.setState({ isResendVerificationCode:true})
     }, 1000);
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
     const {email} = this.props;

    const { timer} = this.state;

       if (timer !== 0) {
         const msg = 'Please wait';
         return showMsg(msg, 'warning');
       } else if (!email) {
                return; //
              }


     sendVerificationEmail({email})
       .then(resp => {
         const msg = 'Please check your email for a verification code';
         showMsg(msg);

          this.setState({ timer: 60});
          this.runClock();

       })
       .catch(err => {
         console.log('sendVerificationEmail():err', err);
         const msg = err.reason || '';
         this.setState({isResendVerificationCode: true});
         Alert.alert('Opps, something went wrong', msg);
       });
   }

   _verifyEmailCode() {
     const {emailCode} = this.state;
     if (!emailCode || emailCode.trim().length === 0) {
       Alert.alert('Error', 'sorry code is required');
       return;
     }

     verifyEmailCode({verificationCode: emailCode})
       .then(status => {
         console.log(status);
         if (!status) {
           Alert.alert('Sorry', 'Invalid code');
           this.setState({isResendVerificationCode: true});
           return;
         }

         const msg = 'Account verified';
        //  showMsg(msg);
         this.props.onActivated();
         //  this.setState({showReverification:false});
       })
       .catch(err => {
         console.log('verifyEmailCode():err',err)
         const msg = err.reason;
        //  Alert.alert(msg);
        showMsg('Sorry something went wrong','danger')
       });
   }

   renderVerificationForm() {
     return EMAIL_VERIFICATION_FIELDS.map((field, index) => (
       <ListItem key={index} style={styles.inputContainer}>
         <Body key={index}>
           <Item style={styles.inputContainer} stackedLabel>
             <Label style={styles.fieldLabel}>{field.label}</Label>
             {(field.type === 'select' && this.renderPicker({field})) ||
               (field.type === 'date' && this.renderDatePicker({field})) || (
                 <Input
                   style={styles.input}
                   secureTextEntry={
                     (field.type === 'password' && true) || false
                   }
                   disabled={
                     field.name == 'email' && this.props.userId ? true : false
                   }
                   placeholder={''}
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
     const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
     const {timer, isWorking, phoneCode} = this.state;

  timer === 0 ? clearInterval(this.interval) : '';


     return (
       <KeyboardAvoidingView
         style={styles.keyboard}
         behavior="height"
         keyboardVerticalOffset={keyboardVerticalOffset}>
         <Container>
           {isWorking && <Spinner color={APP_SECONDARY_COLOR} />}
           <Root>
             <Content>
               <Thumbnail
                 style={styles.formAvartar}
                 large
                 source={require('../../images/logo.png')}
               />
               <Text style={styles.codeSentText}>
                 Please check your email for the verification code
               </Text>

               <Form>
                 {this.renderVerificationForm()}
                 <Body>
                   <Item>
                     <Button
                       style={[
                         styles.submitBtn,
                         {
                           backgroundColor:
                             (isWorking && 'grey') || APP_PRIMARY_COLOR,
                         },
                       ]}
                       title="Submit"
                       onPress={() => this._verifyEmailCode()}>
                       <Text style={styles.submitBtnText}>Verify</Text>
                     </Button>
                   </Item>
                 </Body>

                 <Body>
                   <Item>
                     {this.state.isResendVerificationCode && (
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
                         <Text style={styles.submitBtnText}>
                           Re-Send Verification code
                         </Text>
                       </Button>
                     )}
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
                       Verify Phone number instead ?
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
             </Content>
           </Root>
         </Container>
       </KeyboardAvoidingView>
     );
   }
 }

export default withTracker(params => {
  // Meteor.subscribe('user');
  return {};
})(EmailAuth);



EmailAuth.propTypes = {
  email: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};