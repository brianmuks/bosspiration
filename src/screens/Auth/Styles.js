import { StyleSheet, Platform, Dimensions } from 'react-native';
import { APP_SECONDARY_COLOR_WITH_OPACITY, APP_PRIMARY_COLOR } from '../../Constants';

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
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
  formAvartar:{
    alignSelf:'center',
    marginTop:140
  }


});
