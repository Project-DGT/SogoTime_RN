import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import OnBoardingScreen from '../feature/onBoarding';
import InputScreen from '../feature/input';
import MainScreen from '../feature/main';
import SettingScreen from '../feature/setting';

export type RootStackParamList = {
  OnBoardingScreen: undefined;
  InputScreen: undefined;
  MainScreen: undefined;
  SettingScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoardingScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
        />
        <Stack.Screen
          name="InputScreen"
          component={InputScreen}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
