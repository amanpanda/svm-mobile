import {
  SET_AUTH_STATE,
} from './UserTypes';

export const setAuthState = (isAuthenticated) => {
  return {
    type: SET_AUTH_STATE,
    isAuthenticated,
  }
}