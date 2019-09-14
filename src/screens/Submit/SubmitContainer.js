import {
  compose,
  setDisplayName,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { withAlerts } from 'hocs';
import SubmitPresenter from './SubmitPresenter';
import { auth, firestore, storage } from 'utilities/firebase';
import { clearBacklog } from 'ducks/submit/SubmitActions';
import { SurveyTypes } from 'constants/survey';

import { store } from 'ducks/root';

export default compose(
  setDisplayName('SubmitContainer'),
  withAlerts,
  connect(({ submit }) => ({ submit })),
  withState('disableSubmit', 'setDisableSubmit', false),
  withHandlers({
    logOut: ({ navigation, setError, dispatch }) => async () => {
      const { navigate } = navigation;
      try {
        await auth.signOut();
        navigate('LogIn');
        dispatch({ type: 'LOG_OUT' });
      } catch (err) {
        console.log("err: ", err);
        setError('Could not log out. Please try again later.')
      }
    },
    submitAllSurveys: ({
      submit,
      setDisableSubmit,
      dispatch,
      setSuccess,
      setError,
    }) => async () => {
      setDisableSubmit(true);
      const { backlog } = submit;
      const numberToSubmit = backlog.length;
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setError("Can not complete survey without location permissions.")
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const { 
          coords,
        } = location;
        const { 
          city,
          country,
          isoCountryCode,
          postalCode,
          region,
          street,
        } = (await Location.reverseGeocodeAsync({ ...coords }))[0];
        const locationObject = {
          ...coords,
          city,
          country,
          isoCountryCode,
          postalCode,
          region,
          street,
        };

        _.forEach(backlog, async completedSurvey => {
          const {
            answers,
            completionDate,
            completionTimestamp,
            imageUri,
            meta: {
              documentId,
              surveyType,
            },
            userId,
            username,
          } = completedSurvey;
          const submissionTimestamp = Date.now();
          const submissionDate = moment(submissionTimestamp).local().format('MMM DD YYYY LT');
          const hasImage = imageUri !== '';
          const toSubmit = {
            answers,
            completionDate,
            completionTimestamp,
            userId,
            username,
            submissionTimestamp,
            submissionDate,
            documentId,
            surveyType,
            hasImage,
            ...locationObject,
          };

          const collection = surveyType === SurveyTypes.GENERAL ? 'surveys' : 'assets';
          const { id: submissionId } = await firestore
            .collection(collection)
            .doc(documentId)
            .collection('submissions')
            .add({ ...toSubmit });

          // Update survey meta data
          const docRef = firestore.collection(collection).doc(documentId)
          const documentExists = (await docRef.get()).exists;

          if (documentExists) {
            await firestore.runTransaction(transaction => {
              return transaction.get(docRef).then(async doc => {
                if (doc.exists) {
                  let newNumEntries = 1;
                  if (doc.data().numberOfSubmissions) {
                    newNumEntries = doc.data().numberOfSubmissions + 1;
                  }
                  await transaction.update(docRef, {
                    numberOfSubmissions: newNumEntries,
                    lastSubmissionTimestamp: completionTimestamp,
                  });
                }
              });
            });
          }

          if (hasImage) {
            const blob = await new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.onload = function() {
                resolve(xhr.response);
              };
              xhr.onerror = function(e) {
                reject(new TypeError('Network request failed'));
              };
              xhr.responseType = 'blob';
              xhr.open('GET', imageUri, true);
              xhr.send(null);
            });
            const imageBaseDir = surveyType === SurveyTypes.GENERAL ? 'surveys' : 'assets';
            const res = await storage
              .ref()
              .child(`${imageBaseDir}/${documentId}/${submissionId}.jpg`)
              .put(blob);
            blob.close();
          }
        });
        dispatch(clearBacklog());
        setSuccess(`Successfully submitted ${numberToSubmit} surveys.`);
      } catch (err) {
        setError("Error while submitting surveys. Make sure location services are available.");
        console.log("err: ", err);
      } finally {
        setDisableSubmit(false);
      }
    },
  }),
  withProps(({ submit }) => ({
    numStaged: submit.backlog.length,
    username: auth.currentUser.email,
  })),
)(SubmitPresenter);
