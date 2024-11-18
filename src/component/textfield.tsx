import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  Image,
} from 'react-native';

import CircleXmarkIcon from "../../assets/ic_circle_xmark.png"
import CircleClaimIcon from "../../assets/ic_circle_exlamationmark.png"

interface DodamTextFieldProps extends TextInputProps {
  value: string;
  onValueChange: (text: string) => void;
  label?: string;
  supportText?: string;
  isError?: boolean;
  enabled?: boolean;
  onRemoveRequest?: () => void;
}

const DodamTextFieldDefaults = {
  focusColor: '#0083F0',
  errorColor: '#FF4242',
  strokeColor: '#C4C5C6',
  labelColor: '#5D5F60',
  supportTextColor: '#5D5F60',
};

export const DodamTextField: React.FC<DodamTextFieldProps> = ({
  value,
  onValueChange,
  label = '',
  supportText = '',
  isError = false,
  enabled = true,
  keyboardType = 'default',
  maxLength,
  onRemoveRequest = () => {},
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 5],
    }),
    color: isError
      ? DodamTextFieldDefaults.errorColor
      : isFocused
      ? DodamTextFieldDefaults.focusColor
      : DodamTextFieldDefaults.labelColor,
  };

  const borderColor = isError
    ? DodamTextFieldDefaults.errorColor
    : isFocused
    ? DodamTextFieldDefaults.focusColor
    : DodamTextFieldDefaults.strokeColor;

  const supportTextColor = isError
    ? DodamTextFieldDefaults.errorColor
    : DodamTextFieldDefaults.supportTextColor;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { borderColor, opacity: enabled ? 1 : 0.65 },
        ]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onValueChange}
          editable={enabled}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {value ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onRemoveRequest}
          >
            {isError ? (
              <Image source={CircleClaimIcon} style={styles.errorIcon} />
            ) : (
              <Image source={CircleXmarkIcon} style={styles.removeIcon} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {supportText ? (
        <Text style={[styles.supportText, { color: supportTextColor }]}>
          {supportText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  inputContainer: {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingTop: 12,  
  },
  textInput: {
    fontSize: 16,
    height: 40,
    color: '#000',
    textAlign: "left",
    padding: 0,
    marginStart: 0,
    marginEnd: 32,
  },
  label: {
    position: 'absolute',
    left: 0,
  },
  iconContainer: {
    position: 'absolute',
    right: 8,
    top: 16,
  },
  errorIcon: {
    width: 24,
    height: 24,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  supportText: {
    fontSize: 12,
    marginTop: 4,
  },
});
