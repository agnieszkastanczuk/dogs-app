import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DogList from './views/DogList';
import DogSearch from './views/DogSearch';


const DogListScreen = () => {
  return (
    <View style={styles.container}>
      <DogList />
    </View>
  );
};

const DogSearchScreen = () => {
  return (
    <View style={styles.container}>
      <DogSearch />
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="DogList" component={DogListScreen} />
        <Tab.Screen name="DogSearch" component={DogSearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
