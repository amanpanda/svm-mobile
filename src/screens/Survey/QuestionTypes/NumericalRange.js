import React from 'react';
import { View, Text } from 'react-native';
import { compose, withStateHandlers, } from 'recompose';
import { Slider } from 'react-native-elements';
import styles from './styles';

const NumericalRange = (props) => {
  const {
    localValue,
    setLocalValue,
    currAnswer,
    answerQuestion,
    index,
    question: {
      lowerBound,
      upperBound,
    }
  } = props;
  return (
    <View>
      <Text style={styles.number}>{currAnswer ? localValue : ''}</Text>
      <Slider
        minimumValue={lowerBound}
        maximumValue={upperBound}
        step={1}
        value={localValue}
        onValueChange={value => setLocalValue(value)}
        onSlidingComplete={value => {
          setLocalValue(value);
          answerQuestion({
            value,
            questionIndex: index,
          })
        }}
      />
      <Text>Drag the slider to select your answer.</Text>
    </View>
  );
}

export default compose(
  withStateHandlers(({ question }) => {
    const { lowerBound } = question;
    return { localValue: lowerBound };
  }, {
    setLocalValue: () => localValue => ({ localValue }),
  }),
)(NumericalRange);
