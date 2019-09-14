import {
  compose,
  setDisplayName,
  withHandlers,
  withProps,
} from 'recompose';
import { withAlerts } from 'hocs';
import { connect } from 'react-redux';
import SubmitPresenter from './SubmitPresenter';
import { auth } from 'utilities/firebase';

import { store } from 'ducks/root';

export default compose(
  setDisplayName('SubmitContainer'),
  withAlerts,
  connect(({ submit }) => ({ submit })),
  withHandlers({
    logOut: ({ navigation, setError, dispatch }) => async () => {
      const { navigate } = navigation;
      try {
        await auth.signOut();
        navigate('LogIn');
        dispatch({ type: 'LOG_OUT' });
      } catch (err) {
        console.log("err: ", err);
        setError('Could not log out. Please try again later.')
      }
    },
  }),
  withProps(({ submit }) => ({
    numStaged: submit.backlog.length,
    username: auth.currentUser.email,
  })),
)(SubmitPresenter);
