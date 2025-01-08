import { Appearance } from 'react-native';
import store from './store';
import { setTheme } from './action';

export const initThemeListener = () => {

  const colorScheme = Appearance.getColorScheme();

  store.dispatch(setTheme(colorScheme))

  Appearance.addChangeListener(({ colorScheme }) => {

    store.dispatch(setTheme(colorScheme));

  });

};