// import {
//   DEPOSIT_CHAT_DATA,
//   CLEAR_CHAT_CACHE,
// } from './ChatTypes';

// import { LOGOUT_SUCCESS } from 'ducks/user/UserTypes';

const initialState = {
  general: {},
  assets: {},
};

const surveyReducer = (state=initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};

export default surveyReducer;
