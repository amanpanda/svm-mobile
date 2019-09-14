import {
  compose,
  setDisplayName,
  withStateHandlers,
  lifecycle,
  withProps,
  withState,
  withHandlers,
} from 'recompose';
import moment from 'moment';
import _ from 'lodash';
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { withAlerts } from 'hocs';
import SurveyPresenter from './SurveyPresenter';
import { QuestionTypes } from 'constants/survey';
import { auth } from 'utilities/firebase';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { stageNewSubmission } from 'ducks/submit/SubmitActions';

export default compose(
  setDisplayName('SurveyContainer'),
  withAlerts,
  connect(),
  withProps(({ navigation }) => {
    const { getParam } = navigation;
    return {
      surveyData: getParam('surveyData', {}),
    };
  }),
  withState('imageUri', 'setImageUri', ''),
  withStateHandlers(({ surveyData }) => {
    const { questions } = surveyData;
    return {
      answers: _.map(questions, q => {
        if (q.type === QuestionTypes.MULTIPLE_CHOICE) return [];
        else return '';
      }),
      validation: _.map(questions, q => {
        if (q.isMandatory) return false;
        return true;
      }),
    };
  }, {
    answerQuestion: ({ answers, validation }, { surveyData }) => (answer) => {
      const {
        questionIndex,
        value,
        mcqString,
      } = answer;
      const {
        questions,
      } = surveyData;
      const currQuestion = questions[questionIndex];
      const currAnswer = answers[questionIndex];
      const {
        type,
        isMandatory,
        allowMultipleAnswers,
      } = currQuestion;

      let newAnswer;
      if (type === QuestionTypes.MULTIPLE_CHOICE) {
        if (allowMultipleAnswers) {
          if (value === false) {
            newAnswer = _.filter(currAnswer, ca => ca !== mcqString);
          } else {
            newAnswer = [...currAnswer, mcqString];
          }
        }
        else {
          newAnswer = [mcqString]
        }
        answers[questionIndex] = newAnswer;
      } else {
        answers[questionIndex] = value;
      }

      if (isMandatory) {
        if (type === QuestionTypes.MULTIPLE_CHOICE) {
          validation[questionIndex] = answers[questionIndex].length > 0;
        } else {
          validation[questionIndex] = answers[questionIndex] !== '';
        }
      }

      return {
        answers,
        validation,
      }
    },
  }),
  withState('location', 'setLocation', "dummy"),
  withHandlers({
    completeSurvey: ({
      surveyData,
      answers,
      imageUri,
      dispatch,
      setInfo,
      navigation,
    }) => async () => {
      const completionTimestamp = Date.now();
      const {
        uid: userId,
        email: username,
      } = auth.currentUser;
      const {
        surveyType,
        documentId,
      } = surveyData;
      const completionDate = moment(completionTimestamp).local().format('MMM DD YYYY LT');
      const submission = {
        userId,
        username,
        completionTimestamp,
        completionDate,
        answers,
        imageUri,
        meta: {
          surveyType,
          documentId,
        },
      };
      const { dispatch: navDispatch } = navigation;
      dispatch(stageNewSubmission(submission));
      setInfo("Survey data cached on device");
      navDispatch(StackActions.popToTop());
      // const { status } = await Permissions.askAsync(Permissions.LOCATION);
      // if (status !== 'granted') {
      //   setError("Can not complete survey without location permissions.")
      //   return;
      // }
      // try {
      //   const location = await Location.getCurrentPositionAsync({});
      //   const { 
      //     coords,
      //   } = location;
      //   const { 
      //     city,
      //     country,
      //     isoCountryCode,
      //     postalCode,
      //     region,
      //     street,
      //   } = (await Location.reverseGeocodeAsync({ ...coords }))[0];
      //   setLocation(city)
      //   const locationObject = {
      //     ...coords,
      //     city,
      //     country,
      //     isoCountryCode,
      //     postalCode,
      //     region,
      //     street,
      //   };
      // } catch (err) {
      //   // setLocation(err);
      //   console.log('err: ', err);
      // }
    },
  }),
)(SurveyPresenter);
