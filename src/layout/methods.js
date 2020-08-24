// navigation.js
import { Navigation } from 'react-native-navigation';
import bottomTabs from './bottomTabs';
import TABS from './tabs';
import { SCREENS } from '../init/constants';


export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT',
      children: [
        {
          stack: {
            id: 'HOME_TAB',
            children: [
              {
                component: {
                  id: SCREENS.AUTH.name,
                  name: SCREENS.AUTH.name
                }
              }
            ],
            options: {
              bottomTab: {
                // icon: require('./home.png')
              }
            }
          }
        },

      ]
    }
  },
})

export const gotoAuth = () => Navigation.setRoot({
  root: TABS.authTabs,
})

