import { Button, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import GearIcon from "../../assets/ic_gear.png"
import { useState } from "react";

const MainScreen = () => {

  const [selectedWeekday, setSelectedWeekday] = useState("월요일 / Mon");
  
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitleText}>오늘은?</Text>
          <Text style={styles.titleText}>2024월 10월 28일!</Text>
        </View>
        <View style={styles.spacerStart} />
        <Image source={GearIcon} style={styles.settingIcon} />
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
        style={styles.timetableContainer} 
        contentContainerStyle={styles.timetableContent}
      >
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={true} />
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={false} />
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={false} />
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={false} />
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={false} />
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={false} />
        <TimetableCard header="1교시 | 오전 08 : 50" text="테스트" isSelect={false} />
      </ScrollView>
    </View>
  )
}

interface WeekdayCardProps {
  text: string;
  isSelect: boolean;
  onClick: () => void;
}

const WeekdayCard = ({text, isSelect, onClick}: WeekdayCardProps ) => {
  return (
    <TouchableOpacity 
      style={{
        backgroundColor: isSelect ? 'rgba(73, 226, 150, 0.45);' : 'rgba(214, 214, 214, 0.29)',
        borderRadius: 25,
      }} 
      onPress={onClick}
    >
      <Text style={{
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 22,
        color: isSelect ? '#28905C' : 'rgba(0, 0, 0, 0.29)',
      }}>{text}</Text>
    </TouchableOpacity>
  )
}

interface TimetableCardProps {
  header: string,
  text: string,
  isSelect: boolean
}

const TimetableCard= ({header, text, isSelect}: TimetableCardProps) => {
  return (
    <View style={{
      width: '100%',
      backgroundColor: isSelect? "rgba(215, 248, 232, 0.54)": "#EDEDED",
      borderRadius: 24,
      boxShadow: "2px 5px 3px 0px rgba(136, 134, 144, 0.20)",
      paddingVertical: 19.5,
      paddingStart: 20,
      flexDirection: 'column',
    }}>
      <Text style={{
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 12,
        color: isSelect? '#1B6D44': "#000000",
        letterSpacing: 0.15,
      }}>{header}</Text>
      <Text style={{
        marginTop: 4,
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 24,
        color: '#000000',
        letterSpacing: 0.24
      }}>{text}</Text>

      <View style={{
        width: '60%',
        height: 5,
        backgroundColor: isSelect? '#3FD289': "rgba(28, 28, 28, 0.2)",
        borderRadius: 3,
        marginTop: 16,
      }}/>
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