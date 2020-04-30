const React = require('react');
const { Component } = require('react');
const { View, Platform, TouchableHighlight } = require('react-native');
import { Container, Header, Left, Body, Right, Button, Icon, Segment, Content, Text, H1 } from 'native-base';
import WebContent from './WebContent'

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      activeTab: 'map',// || table
    }
  }


  ToggleTabView({ activeTab }) {
    this.setState({ activeTab });
  }





  render() {
    const { activeTab } = this.state;

    return <WebContent />

    return <Container>

      <WebContent />
      {/* <Content padder>

        <Text style={{ color: 'rgba(0,0,0,0.03)' }}>144,000</Text>
      </Content> */}
    </Container>
  }
}
const App = Home;



module.exports = App;



