import {SCREENS} from '../init/constants';
import {getWLang} from '../resources/lang/methods';
import {WORDS} from '../resources/lang/data/constants';

export default TABS = {
  bottomTabs: [
    //HOME start
    {
      stack: {
        id: SCREENS.HOME.id,
        children: [
          {
            component: {
              id: SCREENS.HOME.id,
              name: SCREENS.HOME.name,
            },
          },
        ],
        options: {
          bottomTab: {
            text: getWLang({word: 'login'}),
            icon: require('../assets/images/logo.png'),
          },
        },
      },
    },
    //HOME end
    //HOME start
    {
      stack: {
        id: SCREENS.HOME.id,
        children: [
          {
            component: {
              id: SCREENS.HOME.id,
              name: SCREENS.HOME.name,
            },
          },
        ],
        options: {
          bottomTab: {
            text: getWLang({word: 'login'}),
            icon: require('../assets/images/logo.png'),
          },
        },
      },
    },
    //HOME end
  ],

  // authTabs start
  authTabs: {
    stack: {
      children: [
        {
          component: {
            name: SCREENS.AUTH.name,
            passProps: {
              text: '',
            },
          },
        },
      ],
      options: {
        bottomTab: {
          text: getWLang({word: WORDS.login}),
          icon: require('../assets/images/logo.png'),
          testID: SCREENS.AUTH.id,
        },
      },
    },
  },
  // authTabs ends
};
