// components/PrimaryInput.js
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

const PrimaryInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  rightText,          // เอาไว้โชว์ตัวหนังสือด้านขวา เช่น icon หรือ emoji
  onPressRight,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, rightText && { paddingRight: 48 }]}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {rightText && (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onPressRight}
          activeOpacity={0.7}
        >
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    justifyContent: "center",
    height: 56,
  },
  input: {
    fontSize: 16,
    color: "#000000",
  },
  rightButton: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightText: {
    fontSize: 18,
  },
});
