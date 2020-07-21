/**  @format
 * @flow
 */

import Meteor from 'react-native-meteor';
import {  Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { USER_ID } from '../../Constants';
import { removeData } from '../../state/preferences';
import { showLoginScreen } from '../../app';

export const login = ({ email, password }) => {

    return new Promise((resolve, reject) => {

        Meteor.call('Account.checkEmailVerification', { email }, (err, ok) => {

            if (err) {
              //  Alert.alert( err.reason );
                reject(err)
                return
            } else {

                const status = ok;
                if (status === null) {
                    const err = { code: 404, reason: 'Email Address not registered' }
                    reject(err)
                    return;
                } else if (status === false) {
                    const err = { code: 405, reason: 'Email Address not verified. Please check your email' }
                    reject(err)
                    return;
                }
          

                Meteor.loginWithPassword(email, password, (_err) => {
                    console.log(Meteor.userId(),_err, 'me');
                   
                    if (_err) {
                        reject(_err)
                        return
                    }

                
                     Meteor.call("Account.clearLoginSessionOnLogin");



                    
                    // ;
                                    console.warn(err, 'Login():');

                    //get latest fcm token
                    firebase.messaging().getToken()
                        .then(fcmToken => {
                            if (fcmToken) {

                                const _id = Meteor.userId();
                                const profile = { fcmToken };
                                updateProfile({ profile, _id })
                                .then(res=>{
                                    console.log('FCM token updated');

                                    resolve(true);
                                    return
                                    
                                })
                                .catch(err=>{
                                    console.log('error occured');

                                    reject(err);
                                    return
                                });

                                // user has a device token
                            } else {
                                resolve(true);//we resolve to true because we don't want notifications to keep a 
                                //user from not using the app. They can still get emails
                                return
                                // user doesn't have a device token yet
                            }
                        });


                    resolve(true);
                    return;
                })
                
            }
        })
    })

}



export const validatePassword = ({ password, password2 }) => {

    const regExp = /\d/.test(password);
    const regExp2 = /([a-z])/.test(password);

    console.log(regExp, regExp2, password);


    if (password.length < 5) {
        Alert.alert( 'Pasword is short. ' );
        return false
    } else if (password !== password2) {
        Alert.alert( 'Pasword does not match' );
        return false;
    }

    else if (!regExp || !regExp2) {
        Alert.alert( 'Pasword is weak. please include number and letters' );
        return false;
    }
    return true;
}

export const register = ({ profile, user }) => {

    return new Promise((resolve, reject) => {
        Meteor.call('Account.Register', { user, profile }, (err, ok) => {

            console.log(err, ok);
            if (err) {
                Alert.alert( err.reason );
                reject(err)
            } else {
                resolve(ok);
            }

        })

    })
}

export const changePassword = ({ password }) => {
    return new Promise((resolve, reject) => {
        Meteor.call('Account.changePassword', { password }, (err, ok) => {

            console.log(err, ok);
            if (err) {
                // Alert.alert( err.reason );
                reject(err)
            } else {
                resolve(ok);
            }

        })

    })



}

//admin call
export const changeUserPassword = ({ password, _id }) => {

    return new Promise((resolve, reject) => {
        Meteor.call('Account.changeUserPassword', { password, _id }, (err, ok) => {

            console.log(err, ok);
            if (err) {
                // Alert.alert( err.reason );
                reject(err)
            } else {
                resolve(ok);
            }

        })

    })

}



export const updateProfile = ({ profile, _id }) => {
    console.log(profile, _id);

    // return;

    return new Promise((resolve, reject) => {
        Meteor.call('Account.updateProfile', { profile, _id }, (err, ok) => {
            console.log(err, ok, 'test update fuctoim')
            if (err) {
                reject(err);
                return
            } else {
                resolve(ok);
                return;
            }

        })

    })

}



export const resetPassword = ({ email }) => {

    return new Promise((resolve, reject) => {

        Meteor.call('Account.checkEmailVerification', { email }, (err, status) => {

            if (err) {

                reject(err)
                return;
            }

            if (status == false) {
                Meteor.call('Account.sendVerificationEmail', { email }, (err, status) => {
                })
                reject({ reason: 'Email address not verified. Please check you email' });
                return
                //not verified
            } else if (status === null) {
                reject({ reason: 'Email address not registered.' })


                return;
                //not found
            }

            Meteor.call('Account.resetPassword', { email }, (err2, ok2) => {
                console.log(err2, ok2);
                if (err2) {
                    Alert.alert( err2.reason );
                    reject(err2)
                } else {
                    resolve(ok2);
                }

            })
        }
        )

    })

}

export const  logout =()=>{

     return removeData(USER_ID)
        .then(res => {
           Meteor.logout(err=>{

            if (err) {
          Alert.alert("Error", "Sorry error occured");
                
                return
            }
            showLoginScreen();
           });

        })
        .catch(err => {
          Alert.alert("Error", "Sorry error occured");
          console.log("logout():err", err);
        });


}


export const sendVerificationEmail = ({ email }) => {
    return new Promise((resolve, reject) => {

        Meteor.call('Account.sendVerificationEmail', { email }, (err, status) => {

            if (err) {
                reject(err)
            } else {
                resolve(status);
            }

        })
    })

}