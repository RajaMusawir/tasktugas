import {combineReducers } from 'redux';
import cartReducer from "./reducer";
import themeReducer from './themeReducer';

export default rootReducer = combineReducers({
    cart: cartReducer,
    theme: themeReducer,
});