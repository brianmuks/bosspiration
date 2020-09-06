import React, {useEffect} from 'react';
import {H1} from 'native-base';
import {showErrMsg} from '../../utils';

function AuthApp() {
  useEffect(() => {
    showErrMsg({});
  });

  return <H1>aut h </H1>;
}

export default AuthApp;

// module.exports = AuthApp;
