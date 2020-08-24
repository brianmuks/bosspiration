import { Navigation } from 'react-native-navigation';

// Import components before registering
import { SCREENS } from './constants';



// Register Imported components as screens
Navigation.registerComponent(SCREENS.INIT.name, () => require('../screens/InitApp'));
Navigation.registerComponent(SCREENS.AUTH.name, () => require('../screens/Auth'));
Navigation.registerComponent(SCREENS.HOME.name, () => require('../screens/Home'));
