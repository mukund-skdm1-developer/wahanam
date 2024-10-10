import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import NavStrings from '../navStrings/NavStrings';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetails from '../screens/RecipeDetails';
import Search from '../screens/Search';
import SplashScreen from '../screens/SplashScreen';
import Demo from '../screens/Demo';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Verify from '../screens/Verify';
import Forget from '../screens/Forget';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NavStrings.SPLASH} component={SplashScreen} />
        {/* <Stack.Screen name={NavStrings.HOME} component={HomeScreen} /> */}
        <Stack.Screen name={NavStrings.DETAILS} component={RecipeDetails} />
        <Stack.Screen name={NavStrings.SEARCH} component={Search} />
        <Stack.Screen name={NavStrings.DEMO} component={Demo} />
        <Stack.Screen name={NavStrings.LOGIN} component={Login} />
        <Stack.Screen name={NavStrings.FORGET} component={Forget} />
        <Stack.Screen name={NavStrings.HOMES} component={Home} />

        <Stack.Screen name={NavStrings.SIGNUP} component={Signup} />
        <Stack.Screen name={NavStrings.VERIFY} component={Verify} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}