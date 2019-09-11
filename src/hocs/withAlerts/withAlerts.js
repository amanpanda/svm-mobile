import React from 'react';
import { View } from 'react-native';
import { compose, withHandlers } from 'recompose';
import FlashMessage, { showMessage } from "react-native-flash-message";


const withAlerts = WrappedComponent => (props) => {
  return (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...props} />
      <FlashMessage position="top" /> 
    </View>
  );
}

const enhance = WrappedComponent => compose(
  withAlerts,
  withHandlers({
    setError: () => message => showMessage({ message, type: "error" }),
    setInfo: () => message => showMessage({ message, type: "info" }),
    setSuccess: () => message => showMessage({ message, type: "success" }),
  }),
)(WrappedComponent);

export default enhance;
