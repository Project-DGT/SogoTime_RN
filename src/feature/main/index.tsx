import { AppState, Button, Image, ScrollView, StyleSheet, Text,  TouchableOpacity, View } from "react-native"
import GearIcon from "../../../assets/ic_gear.png"
import { useEffect, useRef, useState } from "react";
import { getCurrentClassTime, useTimetable } from "../../hooks/useTimetable";
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation';
import {useNavigation} from '@react-navigation/native';
import {TimetableCard} from '../../component/main/TimetableCard.tsx';
import {WeekdayCard} from '../../component/main/WeekdayCard.tsx';

function getMondayOfCurrentWeek() {
  const today = new Date(); // 현재 날짜
  const dayOfWeek = today.getDay(); // 요일 (0: 일요일, 1: 월요일, ...)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 월요일까지의 차이 계산
  const monday = new Date(today); // 현재 날짜 복사
  monday.setDate(today.getDate() + diffToMonday); // 날짜 수정
  return monday;
}

function getWeekdayString(date: Date) {
  switch (date.getDay()) {
    case 0:
      return "일요일 / Sun";
    case 1:
      return "월요일 / Mon";
    case 2:
      return "화요일 / Tue";
    case 3:
      return "수요일 / Wed";
    case 4:
      return "목요일 / Thu";
    case 5:
      return "금요일 / Fri";
    case 6:
      return "토요일 / Sat";
    default:
      return "알수없음";
  }
}

const MainScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [nowDate, setNowDate] = useState(new Date());
  const [selectedWeekday, setSelectedWeekday] = useState(getWeekdayString(nowDate));
  const [currentMondayOfCurrentWeek, setCurrentMondayOfCurrentWeek] = useState(getMondayOfCurrentWeek());
  const {timetable, itemsScrollIndex, setItemScrollIndex, newLoadTimeTable} = useTimetable(nowDate);
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
    if (getWeekdayString(nowDate) != selectedWeekday) {
      return;
    }
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

  useEffect(() => {
    console.log('HomeScreen: 화면이 보임');
    
    if (nowDate.getDay() != new Date().getDay()) {
      setNowDate(new Date());
      setCurrentMondayOfCurrentWeek(getMondayOfCurrentWeek());
      newLoadTimeTable(new Date());
    }

    // AppState로 포그라운드 전환 감지
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        if (nowDate.getDay() != new Date().getDay()) {
          setNowDate(new Date());
          setCurrentMondayOfCurrentWeek(getMondayOfCurrentWeek());
          newLoadTimeTable(new Date());
        }
        console.log('HomeScreen: 앱이 포그라운드로 돌아옴');
      }
    });

    return () => {
      subscription.remove();
      console.log('HomeScreen: 화면이 사라짐');
    };
  }, []);


  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitleText}>오늘은?</Text>
          <Text style={styles.titleText}>{nowDate.getFullYear()}월 {nowDate.getMonth() + 1}월 {nowDate.getDate()}일!</Text>
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
            onClick={() => {
              const date = new Date(currentMondayOfCurrentWeek);
              if (selectedWeekday === weekday) {
                return;
              }
              switch (weekday) {
                case "월요일 / Mon":
                  date.setDate(currentMondayOfCurrentWeek.getDate());
                  break;
                case "화요일 / Tue":
                  date.setDate(currentMondayOfCurrentWeek.getDate() + 1);
                  break;
                case "수요일 / Wed":
                  date.setDate(currentMondayOfCurrentWeek.getDate() + 2);
                  break;
                case "목요일 / Thu":
                  date.setDate(currentMondayOfCurrentWeek.getDate() + 3);
                  break;
                case "금요일 / Fri":
                  date.setDate(currentMondayOfCurrentWeek.getDate() + 4);
                  break;
              }
              newLoadTimeTable(date);
              setSelectedWeekday(weekday);
            }}
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
