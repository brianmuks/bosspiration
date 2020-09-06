import React, {useEffect} from 'react';
import {Text} from 'native-base';
import {checkAuthStatus} from './Auth/methods';
import {goHome, gotoAuth} from '../layout/methods';

function InitApp(params) {
  useEffect(() => {
    _checkAuthStatus({});
  }, [0]);

  const _checkAuthStatus = async ({}) => {
    if (await checkAuthStatus({})) {
      goHome({});
    } else {
      gotoAuth({});
    }
  };

  return <Text>Muks</Text>;
}

export default InitApp;

// module.exports = InitApp;
