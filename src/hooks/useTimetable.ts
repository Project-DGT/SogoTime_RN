import { useEffect, useState } from "react";
import { Timetable } from "../types/timetable";
import axios, { Axios } from "axios";
import { baseUrl, customAxios } from "../api/sogotimeApi";
import { print } from "@gorhom/bottom-sheet/lib/typescript/utilities/logger";

export const getCurrentClassTime = (index: number) => {
  480
  switch(index) {
    case 0:
      return 530;
    case 1:
      return 590;
    case 2:
      return 650;
    case 3:
      return 710;
    case 4:
      return 830;
    case 5:
      return 890;
    case 6:
      return 950;
    case 7:
      return 1010;
    case 8:
      return 1070;
    case 9:
      return 1130;
    default:
      return 0;
  }
}

const getTimetableRealTime = (item: Timetable) => {
  switch(item.classTime) {
    case "1교시":
      return "| 오전 08 : 50"
    case "2교시":
      return "| 오전 09 : 50"
    case "3교시":
      return "| 오전 10 : 50"
    case "4교시":
      return "| 오전 11 : 50"
    case "5교시":
      return "| 오후 1 : 30"
    case "6교시":
      return "| 오후 2 : 30"
    case "7교시":
      return "| 오후 3 : 30"
    case "8교시":
      return "| 오후 4 : 30"
    case "9교시":
      return "| 오후 5 : 30"
    default:
      return "| 알수없음"
  }
}

export const useTimetable = () => {
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [itemsScrollIndex, setItemScrollIndex] = useState<number[]>([]);

  const getTimetable = async () => {
    // try {
    
    console.log("called api : " + baseUrl + '/schedule/get-schedule?schoolName=대구소프트웨어고등학교&grade=2&classNum=1&day=28');
    console.log("Axios 기본 설정:", axios.defaults);
    
    const value = await axios.get<Timetable[]>(
      `${baseUrl}/schedule/get-schedule?schoolName=대구소프트웨어고등학교&grade=2&classNum=1&day=28`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const newData = [...value.data];
    newData.sort()
    setItemScrollIndex(newData.map((_) => 0));
    setTimetable(newData.map((item) => {
      {
        return {
          ...item,
          realTime: getTimetableRealTime(item),
        }
      }
    }));
    console.log(newData);
      
    // } catch (error) {
    //   console.log(error);
      
    //   setTimetable([]);
    // }
  }

  useEffect(() => {
    getTimetable()
  }, [])

  return {timetable, itemsScrollIndex, setItemScrollIndex};
}