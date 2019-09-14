import React from 'react';
import _ from 'lodash';
import {
  compose,
  setDisplayName,
  withHandlers,
  withProps,
} from 'recompose'
import styles from './styles';
import { FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';

const renderItem = ({ item, goToSurvey }) => {
  return (
    <ListItem
      title={item}
      titleStyle={{ fontSize: 26 }}
      bottomDivider
      chevron
      onPress={() => goToSurvey(item)}
    />
  );
}

const Subcategories = (props) => {
  const { subcategories, category, goToSurvey } = props;
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={subcategories}
      renderItem={({ item }) => renderItem({ item, goToSurvey })}
      ListHeaderComponent={() => (
        <Text style={styles.header}>{category}</Text>
      )}
    />
  );
}

export default compose(
  setDisplayName('SubcategoriesContainer'),
  connect(({ survey }) => ({ survey })),
  withProps(({ navigation }) => {
    const { getParam } = navigation;
    return {
      subcategories: getParam('subcategories', []),
      category: getParam('category', 'Select a Subcategory'),
    };
  }),
  withHandlers({
    goToSurvey: ({ navigation, survey, category }) => (subcategory) => {
      const { navigate } = navigation;
      const { meta, assets } = survey;
      let surveyData = _.find(assets, asset => {
        const { documentId } = asset;
        return documentId.toString() === `${category} ${subcategory}` && _.has(asset, questions);
      })
      if (!surveyData) {
        surveyData = _.find(assets, asset => asset.isDefault === true);
        surveyData = {
          ...surveyData,
          documentId: `${category} ${subcategory}`,
          surveyTitle: `${category} ${subcategory}`,
        }
      }
      navigate('Survey', { surveyData });
    },
  }),
)(Subcategories);
