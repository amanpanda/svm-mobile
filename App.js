import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, Button, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'ducks/root';
import App from 'utilities/navigation';
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
}

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <FlashMessage position="top" /> 
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