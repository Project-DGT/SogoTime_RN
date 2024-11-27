import { Image, StyleSheet, Text, View } from "react-native";
import { DodamTextField } from "../../component/textfield";
import { useState } from "react";
import ArrowLeftIcon from "../../../assets/ic_arrow_left.png";
import SogoTimeButton from "../../component/button";

const InputScreen = () => {

  const [value, setValue] = useState<string>('');

  return <View style={styles.container}>
    <View style={styles.topbarContainer}>
      <Image source={ArrowLeftIcon} style={styles.topbarBackIcon}/>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitleText}>학년을 입력해주세요.</Text>
      <View style={{height: 16}}/>
      <DodamTextField value={value} label="학생정보" onValueChange={(value) => {
        setValue(value);
      }} isError={false} inputMode="numeric"></DodamTextField>
      <View style={{flex: 1}}></View>
      <SogoTimeButton text="다음으로" onPress={() => {}}/>
      <View style={{height: 8}}/>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  topbarContainer: {
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topbarBackIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  contentTitleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 31.2
  }
})


export default InputScreen;