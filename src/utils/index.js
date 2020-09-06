/**
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Button, Text, Linking} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {getWLang} from '../resources/lang/methods';
import {WORDS} from '../resources/lang/data/constants';
import Toast from 'react-native-toast-message';

export const showMsg = ({
  position = 'top',
  text1 = getWLang({word: WORDS.done}),
  text2 = '',
  bottomOffset = 40,
  onShow = () => {},
  onHide = () => {},
  timeout = 4000,
  autoHide = true,
  topOffset = 30,
}) =>
  Toast.show({
    type: 'info',
    position,
    text1,
    text2,
    visibilityTime: timeout,
    autoHide,
    topOffset,
    bottomOffset,
    onShow,
    onHide,
  });

export const showOkMsg = ({
  position = 'top',
  text1 = getWLang({word: WORDS.succ}),
  text2 = '',
  bottomOffset = 40,
  onShow = () => {},
  onHide = () => {},
  timeout = 4000,
  autoHide = true,
  topOffset = 30,
}) =>
  Toast.show({
    type: 'success',
    position,
    text1,
    text2,
    visibilityTime: timeout,
    autoHide,
    topOffset,
    bottomOffset,
    onShow,
    onHide,
  });

/**Toasts an alert message indicate an error
 *
 * @param {*} param0
 *
 * @returns null
 */
export const showErrMsg = ({
  position = 'top',
  text1 = getWLang({word: WORDS.som_wnt_wrng}),
  text2 = '',
  bottomOffset = 40,
  onShow = () => {},
  onHide = () => {},
  timeout = 4000,
  autoHide = true,
  topOffset = 30,
}) =>
  Toast.show({
    type: 'error',
    position,
    text1,
    text2,
    visibilityTime: timeout,
    autoHide,
    topOffset,
    bottomOffset,
    onShow,
    onHide,
  });

function openUrl(url: string): Promise<any> {
  return Linking.openURL(url);
}
export function openSmsUrl(phone: string, body: string): Promise<any> {
  return openUrl(`sms:${phone}${getSMSDivider()}body=${body}`);
}

export function openCallUrl(phone: string): Promise<any> {
  return openUrl(`tel:${phone}`);
}

function getSMSDivider(): string {
  return Platform.OS === 'ios' ? '&' : '?';
}

export const validateEmail = (email) => {
  email = email.trim();

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const CheckConnectivity = () => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((state) => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        console.log('Is isInternetReachable?', state.isInternetReachable);
        resolve(state.isInternetReachable);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
