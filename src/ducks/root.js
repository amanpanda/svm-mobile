import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from 'react-native'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import submit from './submit/SubmitReducer';
import survey from './survey/SurveyReducer';
import user from './user/UserReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // stateReconciler: autoMergeLevel2,
  // whitelist: ['submit', 'survey', 'user'],
};

const userPersistConfig = {
  storage: AsyncStorage,
  key: 'user',
};

const surveyPersistConfig = {
  storage: AsyncStorage,
  key: 'survey',
};

const submitPersistConfig = {
  storage: AsyncStorage,
  key: 'submit',
};

const rootReducer = combineReducers({
  submit: persistReducer(submitPersistConfig, submit),
  survey: persistReducer(surveyPersistConfig, survey),
  user: persistReducer(userPersistConfig, user),
  // submit,
  // survey,
  // user,
})



let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = createStore(
  persistedReducer, {}, composeEnhancers(
    applyMiddleware(
      thunk, 
      // logger,
    ),
  ),
);

export const persistor = persistStore(store);