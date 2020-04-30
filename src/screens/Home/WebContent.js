const React = require('react');
const { Component } = require('react');
const { View, Text, Platform, TouchableHighlight } = require('react-native');
import { Container, Content, Card } from 'native-base';
import { MAP_WORLD_WIDE_CASES } from './constants';
import ViewWeb from '../../utils/ViewWeb';
import styles from './styles'
import { SERVER_DOMAIN } from '../../config';


export default class WebContent extends Component {
    constructor(props) {
        super();
        this.state = {
            screen: props.screen,
        }
    }
    onShouldStartLoadWithRequest(navigator) {


        return false;


        if (navigator.url.indexOf('https') === -1) {
            return true;
        } else {
            this.refs[WEBVIEW_REF].stopLoading(); //Some reference to your WebView to make it stop loading that URL
            return false;
        }
    }



    render() {
        return <View style={styles.webContainer}>
            {/* <Card> */}
            <ViewWeb onWebPress={navigator => this.onShouldStartLoadWithRequest(navigator)} link={SERVER_DOMAIN} />
            {/* </Card> */}
        </View>
    }
}



