const { Navigation } = require('react-native-navigation');
const { registerScreens } = require('./screens');
const APP_IDS = require('./appIDs');
import { getData, multiGetData } from './state/preferences';
import { IS_ACCOUNT_CREATED, USER_ID } from './constants';

const STATUS_BAR = {
  statusBar: {
    visible: true,
    style: 'dark',
    backgroundColor: '#163c17',
  },
};

export function start() {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        // style: 'dark',
        backgroundColor: '#163c17',
      },
      layout: {
        componentBackgroundColor: '#e8e8e8',
        orientation: ['portrait'],
      },
      topBar: {
        title: {
          color: 'white',
        },
        background: {
          color: '#17c120',
        },
      },
      bottomTab: {
        iconColor: '#gray',
        selectedIconColor: '#17c120',
        textColor: 'gray',
        selectedTextColor: '#17c120',
        fontFamily: 'HelveticaNeue-Italic',
        fontSize: 13,
      },
      _animations: {
        push: {
          waitForRender: false,
        },
      },
      animations: {
        setRoot: {
          alpha: {
            from: 0,
            to: 1,
            duration: 300,
          },
        },
        _push: {
          topBar: {
            id: 'TEST',
            alpha: {
              from: 0,
              to: 1,
              duration: 500,
              interpolation: 'accelerate',
            },
          },
          bottomTabs: {
            y: {
              from: 1000,
              to: 0,
              duration: 500,
              interpolation: 'decelerate',
            },
            alpha: {
              from: 0,
              to: 1,
              duration: 500,
              interpolation: 'decelerate',
            },
          },
          content: {
            y: {
              from: 1000,
              to: 0,
              duration: 500,
              interpolation: 'accelerate',
            },
            alpha: {
              from: 0,
              to: 1,
              duration: 500,
              interpolation: 'accelerate',
            },
          },
        },
        _pop: {
          topBar: {
            id: 'TEST',
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'accelerate',
            },
          },
          bottomTabs: {
            y: {
              from: 0,
              to: 100,
              duration: 500,
              interpolation: 'accelerate',
            },
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'accelerate',
            },
          },
          bottomTabs: {
            y: {
              from: 0,
              to: 100,
              duration: 500,
              interpolation: 'decelerate',
            },
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'decelerate',
            },
          },
          content: {
            y: {
              from: 0,
              to: 1000,
              duration: 500,
              interpolation: 'decelerate',
            },
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'decelerate',
            },
          },
        },
      },
    });
    showLoginScreen();



  });
}



export function showLoginScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'TEST',
        children: [
          {
            component: {
              name: 'App.Home',

              options: {
                topBar: {
                  visible: true,
                  animate: true,
                  title: {
                    text: 'Bosspiration',
                  },
                },
              },
              // name: 'App.CustomTransitionOrigin'
            },
          },
        ],
      },
    },
  });
}



