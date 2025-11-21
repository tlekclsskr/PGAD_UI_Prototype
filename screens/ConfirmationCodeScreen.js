// screens/ConfirmationCodeScreen.js
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const CODE_LENGTH = 4;

const ConfirmationCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    // รับแค่ตัวแรกกันกดหลายตัว
    newCode[index] = text.slice(-1);
    setCode(newCode);

    // ถ้ามีเลขแล้ว ไปช่องถัดไป
    if (text && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    console.log("Resend code");
    // TODO: call API resend
  };

  const handleContinue = () => {
    const finalCode = code.join("");
    if (finalCode.length === 4) {
      console.log("Confirm code:", finalCode);
      // เข้าหน้า MainTabs แล้วแทนที่ stack ไม่ให้กดย้อนกลับมาได้ง่าย
      navigation.replace("MainTabs");
    }
  };

  const isComplete = code.join("").length === CODE_LENGTH;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>Enter confirmation code</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            A 4-digit code was sent to{"\n"}
            <Text style={styles.subtitleBold}>Phone number 097-xxx-x991</Text>
          </Text>

          {/* Code boxes */}
          <View style={styles.codeRow}>
            {code.map((value, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                style={[
                  styles.codeInput,
                  value !== "" && styles.codeInputFilled,
                ]}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                autoFocus={index === 0}
                returnKeyType="next"
              />
            ))}
          </View>

          {/* Resend link */}
          <TouchableOpacity
            onPress={handleResend}
            style={styles.resendWrapper}
          >
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>

          {/* Continue button */}
          <TouchableOpacity
            style={[styles.button, !isComplete && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={!isComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConfirmationCodeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#7A7A7A",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  subtitleBold: {
    fontWeight: "500",
    color: "#555555",
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 12,
    marginBottom: 32,
  },
  codeInput: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
    fontSize: 20,
    color: "#000000",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    display: "flex",
    textAlignVertical: "center",
    lineHeight: "56",
  },
  codeInputFilled: {
    borderColor: "#4F7D81",
  },
  resendWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: "#4F7D81",
    fontWeight: "500",
  },
  button: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#4F7D81",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9FB6B9",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
