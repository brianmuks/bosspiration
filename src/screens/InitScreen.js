const React = require('react');
const { Component } = require('react');
const { View, Text, Platform, TouchableHighlight } = require('react-native');



class InitScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            screen: props.screen,
        }
    }

    render() {
        return <Text>
            Mus
        </Text>
    }
}


const App =  InitScreen;

module.exports =App;



