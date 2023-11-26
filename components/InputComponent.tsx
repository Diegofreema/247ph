import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { TextInput } from 'react-native-paper';

type Props = {
  label: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'email-address' | 'numeric' | 'default';
  secureTextEntry?: boolean;
  value: string;
};

const InputComponent = ({
  label,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry = false,
  value,
}: Props) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      onChangeText={onChangeText}
      mode="outlined"
      keyboardType={keyboardType}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default InputComponent;

const styles = StyleSheet.create({});
