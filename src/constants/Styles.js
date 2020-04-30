const React = require("react");

import { StyleSheet, Platform, Dimensions } from 'react-native';
import { systemWeights, iOSUIKit } from "react-native-typography";
import { APP_PRIMARY_COLOR } from '.';

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  screenTitle: {
    alignSelf: 'center',
    padding: 15,
    fontSize: 20,
    color: 'white',
  },
  _backgroundImage: {
    width: '100%',
    height: '100%',
    borderStartColor: 'red',
    // opacity:0.68,
  },

  _backgroundImageOpacity: {opacity: 0.059,backgroundColor:'rgba(0,0,0,.89)'},

  input: {
    margin: 0,
    borderBottomWidth: 0.78,
    marginLeft: 20,
    borderColor: APP_PRIMARY_COLOR,
    width: width - 40,
    marginRight: 10,
    // alignSelf: 'center',
  },
  keyboard: {
    flex: 1,
  },
});


export const TITLE_STYLE = [iOSUIKit.title3, systemWeights.light];
export const CAPTION_STYLE = [iOSUIKit.caption2, systemWeights.thin];

       export const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -120;
