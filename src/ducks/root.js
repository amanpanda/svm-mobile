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

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['submit', 'survey'],
};

// const submitPersistConfig = {
//   key: 'submit',
//   storage,
// };

// const surveyPersistConfig = {
//   key: 'survey',
//   storage,
// };


// const rootReducer = combineReducers({
//   submit: persistReducer(submitPersistConfig, submit),
//   survey: persistReducer(surveyPersistConfig, survey),
// });

const rootReducer = combineReducers({
  submit,
  survey,
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
      logger,
    ),
  ),
);

export const persistor = persistStore(store);

