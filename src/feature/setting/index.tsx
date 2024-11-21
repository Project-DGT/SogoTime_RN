import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../../../assets/ic_arrow_left.png";
import AvatarIcon from "../../../assets/ic_avatar.png";
import ChevronRightIcon from "../../../assets/ic_chevron_right.png";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

const SettingScreen = () => {
  return (
    <View style={styles.container}>
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
            <Text style={styles.profileEditText}>정보 수정</Text>
          </View>
        </View>

        <View style={styles.divider}></View>
        <SettingItem title="서비스 운영 정책" onPress={() => {}}/>
        <SettingItem title="개인정보 처리 방침" onPress={() => {}}/>
        <SettingItem title="버전" description="1.0.0"/>
      </View>
    </View>
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
  }
})


export default SettingScreen;