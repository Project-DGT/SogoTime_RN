import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../../../assets/ic_arrow_left.png";
import AvatarIcon from "../../../assets/ic_avatar.png";
import ChevronRightIcon from "../../../assets/ic_chevron_right.png";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { DodamTextField } from "../../component/textfield";
import SogoTimeButton from "../../component/button";
import Animated, { interpolate } from "react-native-reanimated";

const SettingScreen = () => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={styles.topbarContainer}>
          <TouchableHighlight
            style={styles.topbarIcon}
            underlayColor={'rgba(0, 0, 0, 0.08)'}
            onPress={() => {}}
          >
            <Image source={ArrowLeftIcon}/>
          </TouchableHighlight>
          <Text style={styles.topbarTitle}>설정</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <Image source={AvatarIcon} style={styles.profileImage}/>
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileText}>1학년 3반</Text>
              <TouchableHighlight
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 25,
                }} 
                underlayColor={'rgba(0, 0, 0, 0.08)'}
                onPress={handlePresentModalPress}>
              <Text style={styles.profileEditText}>정보 수정</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.divider}></View>
          <SettingItem title="서비스 운영 정책" onPress={() => {}}/>
          <SettingItem title="개인정보 처리 방침" onPress={() => {}}/>
          <SettingItem title="버전" description="1.0.0"/>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop} 
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            {/* <View style={styles.bottomSheetHandleContainer}>
              <View style={styles.bottomSheetHandleIndicator}></View>
            </View> */}
            <DodamTextField
              label="학생정보"
              placeholder="이름을 입력해주세요"
              value="1학년 4반"
              onValueChange={(value => {

              })}/>

            <View style={{
              height: 24,
            }}/>
            
            <SogoTimeButton
              text="저장하기"
              onPress={() => {}}/>
            

          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

interface SettingItemProps {
  title: string;
  onPress?: () => void;
  description?: string;
}

const SettingItem = ({title, onPress, description}: SettingItemProps) => {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 25,
      }} 
      underlayColor={'rgba(0, 0, 0, 0.08)'}
      onPress={onPress}
      disabled={onPress === undefined}
    >
      <View style={styles.settingContainer}>
        <Text style={styles.settingTitleText}>{title}</Text>
        <View style={{flex: 1}}></View>
        {description && <Text style={styles.settingDescriptionText}>{description}</Text>}
        {onPress && <Image source={ChevronRightIcon} style={styles.settingIcon}/>}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#FFFFFF"
  },
  topbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  topbarIcon: {
    width: 24,
    height: 24,
    marginStart: 16,
    alignSelf: "center",
    backgroundColor: '#FFFFFF',
  },
  topbarTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginStart: 16,
    color: '#000',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    gap: 16,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
  },
  profileTextContainer: {
    marginTop: 9.5,
    display: 'flex',
    flexDirection: 'column',
  },
  profileText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0F0F10',
  },
  profileEditText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 19.6,
    letterSpacing: 0.02,
    color: "#5D5F60",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#5D5F60"
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E6E6E7',
  },
  settingContainer: {
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 3.5,
    display: 'flex',
    flexDirection: 'row',
  },
  settingTitleText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#0F0F10',
  },

  settingDescriptionText: {
    fontSize: 18,
    fontWeight: 400,
    color: '#747678',
  },
  settingIcon: {
    width: 14,
    height: 14,
    tintColor: '#747678',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black', // 어두운 배경 색상
  },
  bottomSheetContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    gap: 24
  },
  bottomSheetHandleContainer: {
    paddingVertical: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetHandleIndicator: {
    width: 76,
    height: 2,
    backgroundColor: '#000000',
  },
})


export default SettingScreen;