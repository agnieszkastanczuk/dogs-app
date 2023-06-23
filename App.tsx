import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import DogList from './views/DogList';
import DogSearch from './views/DogSearch';
import DogListWithRQ from './views/DogListWithRQ';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const DogListScreen = () => {
  return (
    <View style={styles.container}>
      <DogListWithRQ />
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
    <QueryClientProvider client={queryClient}>
      {/* <NavigationContainer> */}
      {/* <Tab.Navigator> */}
      {/* <Tab.Screen name="DogList" component={DogListScreen} />
        <Tab.Screen name="DogSearch" component={DogSearchScreen} /> */}
      {/* </Tab.Navigator> */}
      {/* </NavigationContainer> */}
      <DogListWithRQ />
    </QueryClientProvider>
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
