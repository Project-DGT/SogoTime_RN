import {Text, TouchableOpacity} from 'react-native';

interface WeekdayCardProps {
  text: string;
  isSelect: boolean;
  onClick: () => void;
}

export const WeekdayCard = ({text, isSelect, onClick}: WeekdayCardProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isSelect
          ? 'rgba(73, 226, 150, 0.45);'
          : 'rgba(214, 214, 214, 0.29)',
        borderRadius: 25,
      }}
      onPress={onClick}>
      <Text
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 14,
          fontWeight: '700',
          lineHeight: 22,
          color: isSelect ? '#28905C' : 'rgba(0, 0, 0, 0.29)',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
