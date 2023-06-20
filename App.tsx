import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DogList from './views/DogList';
import DogSearch from './views/DogSearch';

export default function App() {
  return (
    <View style={styles.container}>
      <DogList />
      <DogSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
