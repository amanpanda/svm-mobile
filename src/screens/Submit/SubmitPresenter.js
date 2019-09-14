import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Card, Button } from 'react-native-elements';

const SubmitPresenter = (props) => {
  const {
    logOut,
    numStaged,
    username,
  } = props;
  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.cardContainer}
      >
        <View styles={styles.numStagedContainer}>
          <Text 
            style={styles.numStaged}
          >
            {`${numStaged} survey${numStaged > 1 ? 's' : ''} ready to submit.`}
          </Text>
        </View>
        <View
          style={styles.submitButtonContainer}
        >
          <Button
            title="Submit"
            buttonStyle={{
              backgroundColor: 'green',
            }}
            disabled={false}
            onPress={() => console.log('hi')}
          />
        </View>
      </Card>
      <View style={styles.logOutButtonContainer}>
        <Text style={styles.username}>Signed in as: {username}</Text>
        <Button
          title="Log Out"
          buttonStyle={{
            backgroundColor: 'grey',
          }}
          disabled={false}
          onPress={() => logOut()}
        />
      </View>
    </View>
  );
}

export default SubmitPresenter;