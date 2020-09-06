import React from 'react';

import Toast from 'react-native-toast-message';
import {View} from 'native-base';

const Root = (App) => (props) => {
  return (
    <View style={{flex: 1}}>
      <Toast ref={(ref) => Toast.setRef(ref)} />

      <App {...props} />
    </View>
  );
};

export default Root;
