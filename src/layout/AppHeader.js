import React from 'react';
import {Header, Text, View} from 'native-base';

const AppHeader = ({title = ''}) => {
  return (
    <View style={{height: 50, backgroundColor: 'blue'}}>
      <Text style={{color: 'orange'}}>Header</Text>
    </View>
  );
};

export default AppHeader;
