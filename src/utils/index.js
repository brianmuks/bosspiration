/**
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Button, Text, Linking } from 'react-native';
import { Toast } from 'native-base';
import NetInfo from "@react-native-community/netinfo";



export const showMsg = (
  msg = '',
  type = 'success',
  duration = 3000,
  position = 'bottom',
) => {
  Toast.show({
    text: msg,
    type: type,
    duration: duration,
    position: position,
  });
};

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

export const validateEmail = email => {
  email = email.trim();

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const CheckConnectivity = () => {

  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log("Is isInternetReachable?", state.isInternetReachable);
      resolve(state.isInternetReachable);
    })
      .catch(err => {
        reject(err);
      })

  })

};