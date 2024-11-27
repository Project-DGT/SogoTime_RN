import { Text, TouchableHighlight } from "react-native"

interface SogoTimeButtonProps {
  onPress: () => void,
  text: string,
  disabled?: boolean,
}

const SogoTimeButton = (
  {onPress, text, disabled}: SogoTimeButtonProps
) => {
  return (
    <TouchableHighlight
    style={{
      backgroundColor: "#44D48C",
      borderRadius: 12,
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16.5,
    }} 
    underlayColor={'rgba(0, 0, 0, 0.08)'}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={{
      fontSize: 16,
      fontWeight: '700',
      color: "#FFFFFF"
    }}>{text}</Text>
  </TouchableHighlight>
  )
}

export default SogoTimeButton;