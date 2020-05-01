
import React, { Component } from 'react';
import {
  View, Modal, BackHandler,
  Alert,
  ScrollView, Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';


import { Container, Header, Button, Content, Form, Item, Picker, Input, Label, CheckBox, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

import ScreenLoader from './ScreenLoader';

const { width, height } = Dimensions.get('window');

export default class ViewWeb extends Component {



  constructor(props) {
    super(props);
    this.state = {
      loaderDisplay: 'flex',
      WebViewDisplay: 'none',
      loaded: false,
    }
    // this.handleBackPress = this.handleBackPress.bind();
  }

  componentDidMount() {

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    // this.props.history.goBack()
    return true;
  }

  showError() {
    let txt = 'Sorry error occured! Make sure you have  internet conection'
    Alert.alert('Error', txt)
  }

  _onWebPress({ navigator }) {
    const { onWebPress } = this.props;
    if (onWebPress) {
      const status = onWebPress({ navigator });

      if (status) {
        this.refs[WEBVIEW_REF].stopLoading(); //Some reference to your WebView to make it stop loading that URL
        return
      }
      return true

    }
    // alert('gon')


  }


  render() {
    const { loaded } = this.state;
    // alert(JSON.stringify())
    // console.log(this.props.location.state.link);

    const { link, title } = this.props;

    return (
        <ScrollView style={{flex: 1}}>
          <WebView
              startInLoadingState={!loaded}
              onError={() => { this.showError() }}
              onLoadEnd={() => { this.setState({ loaderDisplay: 'none', WebViewDisplay: 'flex', loaded: true }) }}
              source={{ uri: link }}
              style={{ marginTop: 20, height: height }}
              // onNavigationStateChange = {navigator=>this._onWebPress({navigator})}

              // style={{ display: this.state.WebViewDisplay }}
              renderLoading={() => <ScreenLoader index={5} />}
          />
          {/*<View style={{flex: 1}}>*/}
          {/*  <WebView*/}
          {/*    startInLoadingState={!loaded}*/}
          {/*    onError={() => { this.showError() }}*/}
          {/*    onLoadEnd={() => { this.setState({ loaderDisplay: 'none', WebViewDisplay: 'flex', loaded: true }) }}*/}
          {/*    source={{ uri: link }}*/}
          {/*    style={{ marginTop: 20 }}*/}
          {/*    // onNavigationStateChange = {navigator=>this._onWebPress({navigator})}*/}

          {/*    // style={{ display: this.state.WebViewDisplay }}*/}
          {/*    renderLoading={() => <ScreenLoader index={5} />}*/}
          {/*  />*/}
          {/*</View>*/}
        </ScrollView>
    );
  }
}
