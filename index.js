import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';


import {OneSignal} from 'react-native-onesignal';
OneSignal.initialize("5192c218-6233-448e-ba71-cf3016632ee8");

console.log("ONESIGNAL" , OneSignal);


AppRegistry.registerComponent(appName, () => App);
