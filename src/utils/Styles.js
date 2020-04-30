import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  phoneInputContainer:{
    padding:25
  },
  verificationCodeInputContainer:{
    marginTop: 25, padding: 25 
  },
  backBtn:{
    padding:10,
    alignSelf:'flex-end',
    marginTop:50,
    color:'rgba(0,0,150,0.8)'

  },
  screenTitle:{
    padding: 25,
    alignSelf:'center',
    color:'white'
  },
  btnDone:{
    padding:10,
    color:'white'
  },
  profilePic:{
    width:40,
    height:40,
    // resizeMode:'contain',
  },
  progressContainer:{
    flex:1,
    paddingLeft: 20,
    paddingRight:20,
    // backgroundColor:'rgba(0,0,0,0.3)',
    alignItems:'center'
  },
  modalFormInputPage:{
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.3)',
    flex:1,
  },
  modalForm:{
    // flex:1,
    marginTop:150,
    width: '80%',
    alignSelf:'center',
    backgroundColor: 'rgba(240,240,240,0.8)',
  },
  closeModalBtn:{
    alignSelf:'flex-end',
    paddingRight:10
  },




});
