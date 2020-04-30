import { StyleSheet, Platform, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
// alert(height);
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(150,150,150,0.1)"
  },

  webContainer: {
    // position:'f',
    width: width,
    height: height,
    marginTop: -14
  }


});
