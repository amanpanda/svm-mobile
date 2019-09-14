import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import { ListItem } from 'react-native-elements';
import { formatTimestamp } from 'utilities/formatTimestamp';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const renderItem = ({ item, goToSubcategories }) => {
  return (
    <ListItem
      title={item}
      titleStyle={{ fontSize: 26 }}
      bottomDivider
      chevron
      onPress={() => goToSubcategories(item)}
    />
  );
}

const AssetsPresenter = (props) => {
  const { assets, meta, categories, goToSubcategories, getAssetsData } = props;
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={categories}
      renderItem={({ item }) => renderItem({ item, goToSubcategories })}
      ListHeaderComponent={() => (
        <Button
          onPress={() => getAssetsData()}
          icon={
            <Icon
              name="ios-sync"
              size={25}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          title="Sync Assets"
          buttonStyle={{
            backgroundColor: '#FF4500',
            margin: 20,
          }}
        />
      )}
    />
  );
}

export default AssetsPresenter;