import { Button, Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import GearIcon from "../../assets/ic_gear.png"
import { useEffect, useRef, useState } from "react";

const MainScreen = () => {

  const [selectedWeekday, setSelectedWeekday] = useState("월요일 / Mon");
  // const []
  const scrollRef = useRef<ScrollView>(null);
  const [itemsScrollIndex, setItemScrollIndex] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);


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
          "5교시 | 오후 13 : 30ewpreqwrmqwkeqwqmrlew\nqweqe\nqewqwe\nqwe\nqwemrlqwlrmlwqrmwqr", 
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
  isSelect: boolean,
  onSetHeight: (height: number) => void,
}

const TimetableCard= ({header, text, isSelect, onSetHeight}: TimetableCardProps) => {
  return (
    <View 
      onLayout={(event) => {
        console.log("hi");
        
        onSetHeight(event.nativeEvent.layout.height);
      }}
      style={{
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