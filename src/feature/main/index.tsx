import { Button, Image, ScrollView, StyleSheet, Text,  TouchableOpacity, View } from "react-native"
import GearIcon from "../../../assets/ic_gear.png"
import { useEffect, useRef, useState } from "react";
import { TimetableCard } from "../../component/main/TimetableCard";
import { WeekdayCard } from "../../component/main/WeekdayCard";
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {

  const [selectedWeekday, setSelectedWeekday] = useState("월요일 / Mon");
  // const []
  const scrollRef = useRef<ScrollView>(null);
  const [itemsScrollIndex, setItemScrollIndex] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  const navigation = useNavigation<OverviewScreenNavigationProps>();


  setTimeout(() => {
    if (!scrollRef.current) return
    console.log(itemsScrollIndex);


    const getIndex = 1;
    let offsetY = 0.0;
    for (let i = 0; i < getIndex; i++) {
      if (i == 0) {
        offsetY + 16;
      }
      offsetY += itemsScrollIndex[i];
      offsetY += 16;
    }
    console.log(offsetY);


    scrollRef.current.scrollTo({y: offsetY, animated: true})
  }, 1000);

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitleText}>오늘은?</Text>
          <Text style={styles.titleText}>2024월 10월 28일!</Text>
        </View>
        <View style={styles.spacerStart} />
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Image source={GearIcon} style={styles.settingIcon} />
        </TouchableOpacity>
      </View>

      <View style={{height: 24}}/>
      <View style={styles.weekdaysContainer}>
        { ["월요일 / Mon", "화요일 / Tue", "수요일 / Wed", "목요일 / Thu", "금요일 / Fri"].map((weekday) => (
          <WeekdayCard
            text={weekday}
            isSelect={weekday === selectedWeekday}
            onClick={() => setSelectedWeekday(weekday)}
          />
        ))}
      </View>

      <View style={{height: 24}}/>
      <ScrollView
        ref={scrollRef}
        style={styles.timetableContainer}
        contentContainerStyle={styles.timetableContent}
      >
        {/* onSetHeight={(height) => console.log(height)} */}
        {[
          "1교시 | 오전 08 : 50",
          "2교시 | 오전 09 : 50",
          "3교시 | 오전 10 : 50",
          "4교시 | 오전 11 : 50",
          "5교시 | 오후 13 : 30",
          "6교시 | 오후 14 : 30",
          "7교시 | 오후 15 : 30"].map((header, index) => (
            <TimetableCard onSetHeight={(height) => {
              const itemScrollIndex = itemsScrollIndex;
              itemScrollIndex[index] = height;
              setItemScrollIndex(itemScrollIndex);
              console.log(itemScrollIndex);
            }} header={header} text="테스트" isSelect={header === "1교시 | 오전 08 : 50"}/>
          ))
          }
          <View style={{height: 400}}/>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    // backgroundColor: 'red',
  },

  spacerStart: {
    marginStart: "auto"
  },

  headerContainer: {
    width: '100%',
    paddingTop: 30,
    paddingStart: 16,
    paddingEnd: 12,
    flexDirection: 'row',
    alignItems: "flex-start",
  },

  settingIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },

  titleContainer: {
    flexDirection: "column"
  },

  subtitleText: {
    fontSize: 32,
    color: 'black',
    lineHeight: 46.8,
    fontWeight: '600',
  },

  titleText: {
    fontSize: 36,
    color: 'black',
    lineHeight: 41.6,
    fontWeight: '600',
  },

  weekdaysContainer: {
    width: '100%',
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    columnGap: 12,
  },
  timetableContainer: {
    width: "100%",
    flexDirection: 'column',
    paddingHorizontal: 16,
  },

  timetableContent: {
    gap: 16
  }
})

export default MainScreen;
