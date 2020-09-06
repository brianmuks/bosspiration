import React from 'react';
import {View} from 'native-base';
import AppBody from './AppBody';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const Layout = (Component) => (props) => {
  return (
    <AppBody>
      <AppHeader />

      <Component />

      <AppFooter />
    </AppBody>
  );
};

export default Layout;
