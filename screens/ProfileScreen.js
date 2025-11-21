// screens/ProfileScreen.js
import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Profile screen (coming soon)</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
