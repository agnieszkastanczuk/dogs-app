import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DogList from './views/DogList';

export default function App() {
  return (
    <View style={styles.container}>
      <DogList />
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
