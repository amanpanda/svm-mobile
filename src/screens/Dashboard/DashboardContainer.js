import {
  compose,
  setDisplayName,
  lifecycle,
  withHandlers,
  withProps,
} from 'recompose';
import _ from 'lodash';
import DashboardPresenter from './DashboardPresenter';
import { connect } from 'react-redux';
import { withAlerts } from 'hocs';
import { firestore } from 'utilities/firebase';
import { setGeneralSurveys } from 'ducks/survey/SurveyActions';

export default compose(
  setDisplayName('DashboardContainer'),
  withAlerts,
  connect(({ survey }) => ({ survey })),
  withHandlers({
    getGeneralData: ({ setError, dispatch, setSuccess }) => async () => {
      try {
        const { docs } = await firestore.collection('surveys')
          .where("live", "==", true)
          .get();
        const formattedDocuments = _.map(docs, d => ({ ...d.data(), documentId: d.id }));
        if (formattedDocuments.length != 0) {
          dispatch(setGeneralSurveys(formattedDocuments));
          setSuccess("Successfully synced Dashboard.")
        }
      } catch {
        setError("Error syncing Dashboard.")
      }
    },
    goToSurvey: ({ navigation, survey }) => (selected) => {
      const { navigate } = navigation;
      const { general } = survey;
      const surveyData = _.find(general, survey => {
        const { surveyTitle } = survey;
        return surveyTitle === selected;
      })
      navigate('Survey', { surveyData });
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { getGeneralData } = this.props;
      getGeneralData()
    }
  }),
  withProps(({ survey }) => {
    const { general } = survey;
    return { general };
  }),
)(DashboardPresenter);
