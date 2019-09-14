import React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import styles from './styles';

const FreeResponse = (props) => {
  const {
    currAnswer,
    answerQuestion,
    index,
  } = props;
  return (
    <View>
      <Input
        placeholder='Type your answer here'
        value={currAnswer}
        onChangeText={value => answerQuestion({
          questionIndex: index,
          value,
        })}
      />
    </View>
  );
}

export default FreeResponse;
