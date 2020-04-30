const React = require('react');
const { Navigation } = require('react-native-navigation');
const InitScreen = require('./InitScreen');
const Home = require('./Home');


function registerScreens() {
  Navigation.registerComponent(`App.InitScreen`, () => InitScreen);
  Navigation.registerComponent(`App.Home`, () => Home);
}

module.exports = {
  registerScreens,
};
