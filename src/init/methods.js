// import React from 'react';
import Root from './Root';
import {Navigation} from 'react-native-navigation';
import Layout from '../layout';

export const _registerComponent = ({screen, App}) => {
  Navigation.registerComponent(screen, (props) => Layout(App, props));
};
