import axios from "axios";
import { USER_LIST } from "./action";
import { put, call, delay } from 'redux-saga/effects';

function* SagaData() {
  const url = "https://dummyjson.com/users";
  const maxRetries = 3;
  const retryDelay = 5000;
  const noData = "No data CAME"

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = yield call(axios.get, url);
      const data = res.data;
      yield put({ type: USER_LIST, data });
      console.log("NEW DATA", data);
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      yield put({ type: USER_LIST, noData });
      if (attempt < maxRetries) {
        yield delay(retryDelay);
      } else {
        console.error("All retry attempts failed.");
        yield put({ type: USER_LIST, noData });
      }
    }
  }
}

export default SagaData;