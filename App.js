/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';


import ViewWeb from './ViewWeb';
import { Container, Header, H1, } from 'native-base';
export const SERVER_DOMAIN = 'https://www.bosspiration.com'
const { width, height } = Dimensions.get('window');


const App: () => React$Node = () => {
  return (

    <>
      <H1 style={{ backgroundColor: 'green', alignSelf: 'center', width: width, color: 'white' }}>
        Bosspiration
      </H1>
      <ViewWeb link={SERVER_DOMAIN} />
    </ >

  );
};


export default App;
