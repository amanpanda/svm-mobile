import React from 'react';
import _ from 'lodash';
import { View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import { 
  MultipleChoice,
  FreeResponse,
  NumericalRange,
} from './QuestionTypes';
import { QuestionTypes } from 'constants/survey';
import { Card, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const {
  MULTIPLE_CHOICE,
  FREE_RESPONSE,
  NUMERICAL_RANGE,
} = QuestionTypes;

const resolveQuestionType = ({ question, currAnswer, answerQuestion, index }) => {
  const { type } = question;
  switch(type) {
    case MULTIPLE_CHOICE:
      return <MultipleChoice {...{ question, currAnswer, answerQuestion, index}} />
    case FREE_RESPONSE:
      return <FreeResponse {...{ question, currAnswer, answerQuestion, index }} />
    case NUMERICAL_RANGE:
      return <NumericalRange {...{ question, currAnswer, answerQuestion, index }} />
    default:
      return <View />
  }
}

const renderQuestion = ({ question, index, currAnswer, currValidation, answerQuestion }) => {
  const { questionStatement } = question;
  return (
    <Card
      key={index}
      title={`Question ${index+ 1}`}
      containerStyle={styles.cardContainer}
      titleStyle={styles.questionTitle}
    >
      <Text style={styles.questionStatement}>
        {questionStatement}
      </Text>
      <View style={styles.questionContentContainer}>
        {resolveQuestionType({ question, currAnswer, answerQuestion, index })}
      </View>
      {!currValidation && <Text style={styles.requiredText}>Answer is Required</Text>}
    </Card>
  )
}

const renderImage = (imageUri) => {
  if (imageUri){
    return (
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.photo}
          resizeMode="contain"
        />
      </View>
    )
  }
  return (<View />)
}

const SurveyPresenter = (props) => {
  let {
    surveyData: {
      surveyTitle,
      questions,
    },
    answers,
    validation,
    answerQuestion,
    setImageUri,
    imageUri,
    completeSurvey,
    location,
  } = props;
  const disable = _.includes(validation, false);
  const invalidAnswers = _.filter(_.map(validation, (v, i) => {
    if (!v) return i + 1
  }), i => i !== undefined);
  const invalidString = `The following questions need answers: ${invalidAnswers.join(', ')}`;
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
    >
      <Card
        containerStyle={styles.cardContainer}
      >
        <View style={styles.surveyTitleContainer}>
          <Text style={styles.surveyTitle}>
            {surveyTitle}
          </Text>
        </View>
      </Card>
      {_.map(questions, (question, index) => {
        const currAnswer = answers[index];
        const currValidation = validation[index];
        return renderQuestion({ question, index, currAnswer, currValidation, answerQuestion })
      })}
      <Card
        title="Photo"
        containerStyle={styles.cardContainer}
        titleStyle={styles.questionTitle}
      >
        {renderImage(imageUri)}
        <Button
          title={imageUri ? "Upload a Different Image" : "Upload an Image"}
          large
          buttonStyle={{
            backgroundColor: '#025697',
          }}
          onPress={async () => {
            const imageRes = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            const {
              cancelled,
              uri,
            } = imageRes;
            if (!cancelled) {
              setImageUri(uri)
            }
          }}
        />
      </Card>
      <View style={styles.completeContainer}>
        {typeof location === 'object' && (
          _.map(_.keys(location), key => (
            <View>
              <Text>{key}</Text>
              <Text>{location[key]}</Text>
            </View>
          ))
        )}
        <Button
          title="Complete survey"
          large
          buttonStyle={{
            backgroundColor: '#FF4500',
          }}
          onPress={() => completeSurvey()}
          disabled={disable}
        />
        {disable && (
          <Text style={styles.requiredText}>{invalidString}</Text>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SurveyPresenter;
