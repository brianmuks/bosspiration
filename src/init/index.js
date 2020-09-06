// Import components before registering
import {SCREENS} from './constants';
import {_registerComponent} from './methods';
import InitApp from '../screens/InitApp';
import AuthApp from '../screens/Auth';
import HomeApp from '../screens/Home';

_registerComponent({screen: SCREENS.INIT.name, App: InitApp});
_registerComponent({screen: SCREENS.AUTH.name, App: AuthApp});
_registerComponent({screen: SCREENS.HOME.name, App: HomeApp});
