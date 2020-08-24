import React, { useEffect } from 'react';
import { Text } from 'native-base';
import { fetchLocalProfile } from '../db/actions';
import { checkAuthStatus } from './Auth/Methods';
import { goHome, gotoAuth } from '../layout/methods';

function InitApp(params) {


    useEffect(() => {
        _checkAuthStatus({});
    }, [0])

    const _checkAuthStatus = ({ }) => {
        if (checkAuthStatus({})) {
            goHome({});
        } else {
            gotoAuth({})

        }
    }

    return <Text>
        Muks
    </Text>
}

// export default InitApp
module.exports = InitApp;
