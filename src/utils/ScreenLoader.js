import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';

// import AppStatusBar from '../../components/Layout/AppStatusBar';

export default class ScreenLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "green",
      bgColor: 'rgba(0,0,0,0)',
      isVisible: true
    }
  }

  render() {
    const { color, bgColor } = this.props;
    const spinColor = (color) ? color : this.state.color;
    const spinBGColor = (bgColor) ? bgColor : this.state.bgColor;
    return (
      <View style={[styles.container, { backgroundColor: spinBGColor }]}>
        <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.props.size || this.state.size} type={this.state.types[this.props.index]} color={spinColor} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    position: 'absolute',
    alignSelf: 'center',
    margin: '30%'
  },
  spinner: {
    marginTop: 80,
    marginBottom: 10,
    alignSelf: 'center'
  },
  btn: {
    marginTop: 20
  },
  text: {
    color: "white"
  }
});
