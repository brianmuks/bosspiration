

import { StyleSheet, Platform, Dimensions } from 'react-native';
import { APP_PRIMARY_COLOR } from './constants';

const { width, height } = Dimensions.get('window');

export default Appstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(150,150,150,0.1)',

    },

    //NEW
    fieldLabel: {
        paddingLeft: 20
    },
    loginText: {
        alignSelf: 'flex-end',
        padding: 10,
        paddingRight: 20
    },
    submitBtn: {
        backgroundColor: APP_PRIMARY_COLOR,
        padding: 8,
        margin: 8,
    },
    submitBtnText: {
        color: 'white',
    },
    formAvartar: {
        alignSelf: 'center',
        marginTop: 140
    },
    keynboard: {}



});
