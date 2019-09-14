import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import _ from 'lodash';
import styles from './styles';

const MultipleChoice = (props) => {
  const {
    question: {
      answerChoices,
      allowMultipleAnswers,
    },
    currAnswer,
    answerQuestion,
    index,
  } = props;

  return (
    <View>
      {_.map(answerChoices, (ac, i) => {
        const checked = _.includes(currAnswer, ac);
        return (
          <View key={i}>
            <CheckBox
              title={ac}
              checked={_.includes(currAnswer, ac)}
              onPress={() => answerQuestion({
                questionIndex: index,
                value: allowMultipleAnswers ? !checked : true,
                mcqString: ac,
              })}
            />
          </View>
        )
      })}
    </View>
  );
}

export default MultipleChoice;
