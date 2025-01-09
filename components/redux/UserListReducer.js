import { Switch } from "react-native-gesture-handler"
import { USER_LIST } from "./action"

const initialState = []

const UserListReducer = (state=initialState, action) => {
    switch (action.type) {
        case USER_LIST :
            return[
                ...state, action.data
            ]
        default: 
        return state;
    }
}
export default UserListReducer;