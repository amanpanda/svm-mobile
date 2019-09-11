import {
  SET_AUTH_STATE
} from './UserTypes';

const initialState = {
  isAuthenticated: false,
};

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    default:
      case SET_AUTH_STATE:
        const { isAuthenticated } = action; 
        return {
          ...state,
          isAuthenticated,
        }
      return {
        ...state,
      };
  }
};

export default userReducer;
