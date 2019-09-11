import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

export const DEFAULT_TRANSPARENCY =  'rgba(255,255,255,0.9)';

const authField = props => {
  const ifAndroid = Platform.OS === 'android';
  return (
    <View style={ifAndroid 
      ? styles.authFieldContainerAndroid : styles.authFieldContainer}>
      <View styles={ifAndroid 
        ? styles.titleContainerAndroid : styles.titleContainer}>
        <Text 
          {...props}
          style={[ifAndroid
          ? styles.titleAndroid : styles.title, props.style]}>
          {props.children}
        </Text>
      </View>
      <View styles={ifAndroid
        ? styles.authInputContainerAndroid : styles.authInputContainer}>
        <TextInput
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          editable={props.editable}
          onChangeText={props.onChangeText}
          autoCapitalize={props.autoCapitalize 
            ? props.autoCapitalize
            : 'none'}
          autoCorrect={false}
          disableUnderline={true}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          placeholder='' 
          underlineColorAndroid='transparent'
          value={props.value}
          spellCheck={false}
          secureTextEntry={props.ifSecureTextEntry}
          style={[ifAndroid
          ? styles.authInputAndroid : styles.authInput, props.style]}
          
        />
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authFieldContainer: {
    marginTop: '3%',
    marginBottom: '3%',
  },
  titleContainer: {

  },
  title: {
    color: DEFAULT_TRANSPARENCY,
    paddingBottom: '4%',
    fontSize: 18
  },
  authInputContainer: {

  },
  authInput: {
    borderBottomColor: DEFAULT_TRANSPARENCY,
    borderBottomWidth: 1,
    color: DEFAULT_TRANSPARENCY,
    fontSize: 18,
    includeFontPadding: false,
    paddingBottom: '3%'
  },

  authFieldContainerAndroid: {
    marginTop: '5%',
  },
  titleContainerAndroid: {

  },
  titleAndroid: {
    color: DEFAULT_TRANSPARENCY,
    // paddingTop: '1%',
    fontSize: 20
  },
  authInputContainerAndroid: {
  },
  authInputAndroid: {
    borderBottomColor: DEFAULT_TRANSPARENCY,
    borderBottomWidth: 1,
    color: DEFAULT_TRANSPARENCY,
    fontSize: 16,
    includeFontPadding: false,
    paddingTop: '1%',
  }
});

export default authField;