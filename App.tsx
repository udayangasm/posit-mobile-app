import React  from 'react';
import HomeScreen from './HomeScreen';
import ProfitScreen from './ProfitScreen';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalProvider } from './GlobalContext';


const  App  = () => {

  const Stack = createStackNavigator();

  return (
    <GlobalProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profit" component={ProfitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </GlobalProvider>
  );
}

export default App;