import {configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import runSaga from 'redux-saga'
import SagaData from './saga'

const SagaMiddleware = createSagaMiddleware();
const store = configureStore({reducer : rootReducer, middleware: () => [SagaMiddleware]})

SagaMiddleware.run(SagaData)
export default store;