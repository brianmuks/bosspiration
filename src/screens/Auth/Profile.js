const React = require('react');
const { Component } = require('react');
const { View, Text, Platform, TouchableHighlight } = require('react-native');
import Meteor, { withTracker } from 'react-native-meteor';
import { COLLECTIONS } from '../../Constants';
import CreateAccount from './CreateAccount';

class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            screen: props.screen,
        }
    }
    render() {
        return <CreateAccount userId={this.props.userId} />
    }
}
module.exports = Profile;