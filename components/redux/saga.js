import axios from "axios";
import { USER_LIST } from "./action";
import { put } from 'redux-saga/effects'

function* SagaData() {
const  url = "https://dummyjson.com/users"
const res = yield axios.get(url)
const data = res.data;
console.warn("api data", data);
yield put({type:USER_LIST,data})
}
export default SagaData;