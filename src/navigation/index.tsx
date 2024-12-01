import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import OnBoardingScreen from '../feature/onBoarding';
import InputScreen from '../feature/input';
import MainScreen from '../feature/main';
import SettingScreen from '../feature/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

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
  const [initialRoute, setInitialRoute] = useState<string | null>(null); // 초기 화면 설정 상태

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const gradeNum = await AsyncStorage.getItem('gradeNum');
        // gradeNum이 존재하면 MainScreen, 없으면 OnBoardingScreen
        console.log('gradeNum:', gradeNum ? "MainScreen" : "OnBoardingScreen");
        
        setInitialRoute(gradeNum ? 'MainScreen' : 'OnBoardingScreen');
      } catch (error) {
        console.error('Error loading initial route:', error);
        setInitialRoute('OnBoardingScreen'); // 오류 시 기본값 설정
      }
    };

    initializeApp();
  }, []);

  // 로딩 중 화면 표시
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
