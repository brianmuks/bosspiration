import React from 'react';
import {View, FooterTab, Header, Container} from 'native-base';
import Toast from 'react-native-toast-message';

const AppBody = ({children}) => {
  return (
    <Container>
      <Toast ref={(ref) => Toast.setRef(ref)} />

      {children}
    </Container>
  );
};

export default AppBody;
