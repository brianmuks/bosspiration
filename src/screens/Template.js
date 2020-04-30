const React = require('react');
const { Component } = require('react');
const { View, Text, Platform, TouchableHighlight } = require('react-native');


class Permit extends Component {
    constructor(props) {
        super();
        this.state = {
            screen: props.screen,
        }
    }

    render() {
        return <Text>Muks</Text>
    }
}
const App = withTracker(params => {

    return {
    }
})(Permit);




module.exports = App;



