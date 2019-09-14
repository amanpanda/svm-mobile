import React from 'react';
import { View } from 'react-native';
import { compose, withHandlers } from 'recompose';
import FlashMessage, { showMessage } from "react-native-flash-message";


const withAlerts = WrappedComponent => (props) => {
  return (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...props} />
    </View>
  );
}

const enhance = WrappedComponent => compose(
  withAlerts,
  withHandlers({
    setError: () => description => showMessage({ message: "Error", type: "danger", description, }),
    setInfo: () => description => showMessage({ message: "Note:", type: "info", description }),
    setSuccess: () => description => showMessage({ message: "Success", type: "success", description }),
  }),
)(WrappedComponent);

export default enhance;
