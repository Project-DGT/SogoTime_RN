import { Button, Image, ScrollView, StyleSheet, Text,  TouchableOpacity, View } from "react-native"
import GearIcon from "../../../assets/ic_gear.png"
import { useEffect, useRef, useState } from "react";
import { getCurrentClassTime, useTimetable } from "../../hooks/useTimetable";
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation';
import {useNavigation} from '@react-navigation/native';
import {TimetableCard} from '../../component/main/TimetableCard.tsx';
import {WeekdayCard} from '../../component/main/WeekdayCard.tsx';


const MainScreen = () => {

  const [selectedWeekday, setSelectedWeekday] = useState("월요일 / Mon");
  const scrollRef = useRef<ScrollView>(null);
  const {timetable, itemsScrollIndex, setItemScrollIndex} = useTimetable();
  const [nowClassTimeIndex, setNowClassTimeIndex] = useState(-1);
  type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    console.log(itemsScrollIndex);

    let offsetY = 0.0;
    for (let i = 0; i < index; i++) {
      if (i == 0) {
        offsetY + 16;
      }
      offsetY += itemsScrollIndex[i];
      offsetY += 16;
    }
    console.log(offsetY);


    scrollRef.current.scrollTo({y: offsetY, animated: true})
  }

  useEffect(() => {
    if (itemsScrollIndex.length == 0) {
      return;
    }
    for (let i = 0; i < itemsScrollIndex.length; i++) {
      if (itemsScrollIndex[i] == 0) {
        return;
      }
    }

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const currentTime = hour * 60 + minute;
    for (let i = itemsScrollIndex.length - 1; i >= 0; i--) {
      const classStartTime = getCurrentClassTime(i); // 교시 시작 시간을 분 단위로 변환
      if (currentTime >= classStartTime) {
        setNowClassTimeIndex(i);
        scrollToIndex(i);
        break;
      }
    }
  }, [itemsScrollIndex])


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
        {timetable.map((header, index) => (
            <TimetableCard onSetHeight={(height) => {
              setItemScrollIndex((prevItemsScrollIndex) => {
                const updatedItemsScrollIndex = [...prevItemsScrollIndex];
                updatedItemsScrollIndex[index] = height;
                console.log(updatedItemsScrollIndex);
                return updatedItemsScrollIndex;
              });
            }} header={`${header.classTime} ${header.realTime}`} text={header.subject} isSelect={index === nowClassTimeIndex}
              key={index}/>
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
