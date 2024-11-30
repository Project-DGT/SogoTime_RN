import {Text, View} from 'react-native';

interface TimetableCardProps {
  header: string,
  text: string,
  isSelect: boolean,
  onSetHeight: (height: number) => void,
}

export const TimetableCard= ({header, text, isSelect, onSetHeight}: TimetableCardProps) => {
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
