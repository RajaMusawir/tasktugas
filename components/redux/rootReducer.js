import {combineReducers } from 'redux';
import cartReducer from "./reducer";
import themeReducer from './themeReducer';
import UserListReducer from './UserListReducer'

export default rootReducer = combineReducers({
    cart: cartReducer,
    theme: themeReducer,
    userList: UserListReducer
});