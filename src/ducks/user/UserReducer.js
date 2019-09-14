import {
  SET_AUTH_STATE
} from './UserTypes';

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_AUTH_STATE:
      const { isAuthenticated } = action; 
      return {
        ...state,
        isAuthenticated,
      }
    case 'LOG_OUT':
      return {
        isAuthenticated: false,
      }
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
