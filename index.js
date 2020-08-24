import { Navigation } from "react-native-navigation";
import { SCREENS } from "./src/init/constants";
import './src/init'






Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SCREENS.INIT.name
            }
          }
        ]
      }
    }
  });
});