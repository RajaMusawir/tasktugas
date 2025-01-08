import {Appearance} from 'react-native'
import {lightScheme} from './../../src/theme/lightScheme';
import darkScheme from './../../src/theme/darkScheme';
console.log(lightScheme);
console.log(darkScheme);

const initialState = {
  theme: Appearance.getColorScheme() === 'dark' ? darkScheme : lightScheme,
};
console.log('initial state:', initialState);
console.log(Appearance.getColorScheme());


 const themeReducer = (state = initialState, action) => {
    console.log('On case');
  switch (action.type) {
    
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload === 'dark' ? darkScheme : lightScheme,
      };
    default:
      return state;
  }
  
};
console.log('exited');
export default themeReducer;