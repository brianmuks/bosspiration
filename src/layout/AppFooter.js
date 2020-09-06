import React from 'react';
import {View, FooterTab, Text} from 'native-base';
import {Dimensions} from 'react-native';

const AppFooter = () => {
  return (
    <View
      style={{
        height: 50,
        marginTop: Dimensions.get('window').height - 200,
        backgroundColor: 'red',
      }}>
      <Text style={{color: 'orange'}}>Footer</Text>
    </View>
  );
};

export default AppFooter;
