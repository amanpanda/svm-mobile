import React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  setDisplayName,
  withStateHandlers,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { withAlerts, withLoading } from 'hocs';
import { setAuthState } from 'ducks/user/UserActions';
import { auth } from 'utilities/firebase';

import LogInPresenter from './LogInPresenter';

export default compose(
  setDisplayName('LogInContainer'),
  withAlerts,
  withLoading,
  connect(),
  withStateHandlers(() => ({
    username: 'aman@smartvillagemovement.org',
    password: 'helloo',
  }), {
    setUsername: () => username => ({ username }),
    setPassword: () => password => ({ password }),
  }),
  withState('disableSubmit', 'setDisableSubmit', false),
  withProps(({ username, password, disableSubmit }) => {
    if (!disableSubmit) {
      if (username.length < 6 || password.length < 6) {
          return { disableSubmit: true }
        }
      return { disableSubmit: false };
    }
  }),
  withHandlers({
    submitLogIn: ({
      setSuccess,
      setError,
      username,
      password,
      setDisableSubmit,
      dispatch,
    }) => async () => {
      try {
        setDisableSubmit(true);
        const res = await auth.signInWithEmailAndPassword(username, password);
        setSuccess("Welcome.");
        dispatch(setAuthState(true));
      } catch (error) {
        setError("Could not log in. Your username and password combination was incorrect.")
      } finally {
        setDisableSubmit(false);
      }
    },
  }),
)(LogInPresenter);


