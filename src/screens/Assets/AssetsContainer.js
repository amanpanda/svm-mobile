import {
  compose,
  setDisplayName,
  lifecycle,
  withHandlers,
  mapProps,
  withProps,
} from 'recompose';
import _ from 'lodash';
import AssetsPresenter from './AssetsPresenter';
import { withAlerts } from 'hocs';
import { connect } from 'react-redux';
import { firestore } from 'utilities/firebase';
import { setAssetSurveys, setMetaData } from 'ducks/survey/SurveyActions';

export default compose(
  setDisplayName('AssetsContainer'),
  withAlerts,
  connect(({ survey }) => ({ survey })),
  withProps(({ survey }) => {
    const { assets, meta } = survey;
    const categories = _.map(meta, m => m.formattedName);
    return { categories };
  }),
  withHandlers({
    getAssetsData: ({ setError, dispatch, setSuccess }) => async () => {
      try {
        const { docs } = await firestore.collection('assets').get();
        const formattedDocuments = _.filter(_.map(docs, d => d.data()), d => !_.has(d, 'isMeta'));
        const metaData = _.map(_.filter(docs, d => _.has(d.data(), 'isMeta')), d => d.data());
        if (metaData.length > 0) {
          dispatch(setMetaData(metaData[0]['assetCategories']));
        }
        if (formattedDocuments.length > 0) {
          dispatch(setAssetSurveys(formattedDocuments));
          setSuccess("Successfully synced assets data.")
        }
      } catch (err) {
        setError("Could not fetch data. Try again later.")
      }
    },
    goToSubcategories: ({ navigation, survey }) => (formattedName) => {
      const { navigate } = navigation;
      const { meta } = survey;
      const item = _.find(meta, i => i.formattedName === formattedName);
      const { subcategories } = item;
      navigate('Subcategories', {
        category: formattedName,
        subcategories,
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getAssetsData } = this.props;
      getAssetsData();
    }
  }),
)(AssetsPresenter);
