// import React from 'react';
import Root from './Root';
import {Navigation} from 'react-native-navigation';
// import AppWrapper from './AppWrapper';

export const _registerComponent = ({screen, App}) => {
  Navigation.registerComponent(screen, (props) => Root(App, props));
};
