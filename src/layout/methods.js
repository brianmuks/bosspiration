// navigation.js
import { Navigation } from 'react-native-navigation';
import TABS from './tabs';

import { TABS_IDS } from '../init/constants';


export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      ...getMainBottomTabs()
    }
  },
})

export const gotoAuth = () => Navigation.setRoot({
  root: TABS.authTabs,
})


export const getMainBottomTabs = () => ({
  id: TABS_IDS.BOTTOM_TABS_LAYOUT,
  children: TABS.bottomTabs.map(tab => (tab))
})

