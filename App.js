import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import firebase from 'utilities/firebase';
import { store, persistor } from 'ducks/root';

import LogIn from 'screens/LogIn';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LogIn />
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
