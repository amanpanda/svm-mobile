import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem, Button } from 'react-native-elements';
import { formatTimestamp } from 'utilities/formatTimestamp';


const renderItem = ({ item, goToSurvey }) => {
  const {
    surveyTitle,
    lastUpdatedTimestamp,
  } = item;
  return (
    <ListItem
      title={surveyTitle}
      subtitle={`Last updated: ${formatTimestamp(lastUpdatedTimestamp)}`}
      titleStyle={{ fontSize: 26 }}
      subtitleStyle={{ fontSize: 16 }}
      bottomDivider
      chevron
      onPress={() => goToSurvey(surveyTitle)}
    />
  );
}

const DashboardPresenter = (props) => {
  const { general, getGeneralData, goToSurvey } = props;
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={general}
      renderItem={({ item }) => renderItem({ item, goToSurvey })}
      ListHeaderComponent={() => (
        <Button
          icon={
            <Icon
              name="ios-sync"
              size={25}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          title="Sync Dashboard"
          buttonStyle={{
            backgroundColor: '#FF4500',
            margin: 20,
          }}
          onPress={() => getGeneralData()}
        />
      )}
    />
  )
}

export default DashboardPresenter;