import * as React from "react";
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
export default function OnBoardingScreen() {

  type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'OnBoardingScreen'>;
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>시간표를</Text>
        <Text style={styles.subTitle}>빠르고 간편하게</Text>
        <Text style={styles.mainTitle}>소고타임</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('InputScreen')}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#FFFFFF"
  },
  textContainer: {
    alignItems: "flex-start",
    paddingStart: 24,
    paddingTop: 95,
    paddingEnd: 120,
    marginBottom: 'auto',
  },
  subTitle: {
    fontSize: 42,
    color: '#3FD289',
  },
  mainTitle: {
    fontSize: 68,
    color: '#3FD289',
    fontWeight: '900',
    paddingTop: 15,
  },
  startButton: {
    backgroundColor: '#3FD289',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
