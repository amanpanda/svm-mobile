
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  compose,
  lifecycle,
} from 'recompose'
import styles from './styles';
import { store } from 'ducks/root';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator
      size="large"
      color="#FF4500"
    />
  </View>
);

export default compose(
  lifecycle({
    // To do: Figure out how to listen to store
    // rehydration, and deduce the conditional navigation from there.
    componentDidMount() {
      const {
        navigation: {
          navigate,
        },
      } = this.props;
      setTimeout(() => {
        const {
          user: {
            isAuthenticated,
          },
        } = store.getState();
        navigate('Tabs');
        // if (isAuthenticated) navigate('Tabs');
        // else navigate('LogIn');
      }, 1)
    },
  }),
)(Loading);
