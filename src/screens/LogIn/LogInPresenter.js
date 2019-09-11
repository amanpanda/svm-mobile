import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { AuthField } from 'components';
import { Button } from 'react-native-elements';

const LogInPresenter = (props) => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    submitLogIn,
    disableSubmit,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>Log In</Text>
        <AuthField
          ifSecureTextEntry={false}
          keyboardType='email-address'
          value={username}
          editable={true}
          onChangeText={s => setUsername(s)}
        >
          Email Address
        </AuthField>
        <AuthField 
          ifSecureTextEntry={true}
          value={password}
          editable={true}
          onChangeText={s => setPassword(s)}>
          Password
        </AuthField>
        <View style={styles.submit}>
          <Button
            title="Log In"
            large
            buttonStyle={{
              backgroundColor: '#FF4500',
            }}
            disabled={disableSubmit}
            onPress={() => submitLogIn()}
          />
        </View>
      </View>
    </View>
  );
}

export default LogInPresenter;
