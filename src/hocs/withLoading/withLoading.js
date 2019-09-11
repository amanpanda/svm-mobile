import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { compose, withState } from 'recompose';
import styles from './styles';


const withLoading = WrappedComponent => (props) => {
  const { loading } = props;
  return (
    <View style={{ flex: 1 }}>
      { loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
            // animating={loading}
          />
        </View>
      )}
      <WrappedComponent {...props} />
    </View>
  );
}

const enhance = WrappedComponent => compose(
  withState('loading', 'setLoading', true),
  withLoading,
)(WrappedComponent);

export default enhance;
