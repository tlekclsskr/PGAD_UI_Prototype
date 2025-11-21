// screens/SummaryScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
// กำหนดความกว้างกราฟให้เล็กกว่าจอหน่อย จะได้ไม่ล้นขอบ
const chartWidth = screenWidth - 64;

const anomalyData = [3.8, 3.9, 3.5, 2.8, 2.1, 2.3, 2.2, 3.4, 3.3, 3.7, 3.9, 4.1];
const distanceData = [2.4, 2.2, 2.0, 1.8, 1.9, 2.1, 2.3, 2.8, 3.0, 3.2, 3.5, 3.4];

const SummaryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Profile icon */}
        <View style={styles.headerRow}>
          <View />
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={24} color="#4F7D81" />
          </TouchableOpacity>
        </View>

        {/* Chart header */}
        <View style={styles.chartHeaderRow}>
          <Text style={styles.axisLabel}>Anomaly</Text>
          <Text style={styles.axisLabel}>Distance</Text>
        </View>

        {/* Chart */}
        <View style={styles.chartWrapper}>
          <View>
            {/* Bar chart (แท่งส้ม) */}
            <BarChart
              data={{
                labels: [],
                datasets: [{ data: anomalyData }],
              }}
              width={chartWidth}
              height={260}
              fromZero
              withInnerLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              chartConfig={{
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0,0,0,${opacity})`, // ใช้กับ text ถ้ามี
                fillShadowGradient: "#FF8C1A",       // สีแท่งส้ม
                fillShadowGradientOpacity: 1,
                barPercentage: 0.7,
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
              }}
              style={{ alignSelf: "center" }}
            />

            {/* Line chart ซ้อนทับบน bar */}
            <LineChart
              data={{
                labels: [],
                datasets: [{ data: distanceData }],
              }}
              width={chartWidth}
              height={260}
              withDots={false}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              chartConfig={{
                backgroundGradientFrom: "transparent",
                backgroundGradientTo: "transparent",
                color: (opacity = 1) => `rgba(34,34,34,${opacity})`,
                decimalPlaces: 1,
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
              }}
              style={[
                styles.lineChartOverlay,
                // จัดให้เส้นอยู่ตรงกลางกราฟเดียวกับ bar
                { left: (screenWidth - chartWidth) / 2 },
              ]}
            />
          </View>
        </View>

        {/* Time range selector */}
        <View style={styles.rangeRow}>
          {["3m", "6m", "1y", "2y", "Max"].map((label) => {
            const active = label === "1y";
            return (
              <TouchableOpacity key={label} style={styles.rangeItem}>
                <View
                  style={[
                    styles.rangePill,
                    active && styles.rangePillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.rangeText,
                      active && styles.rangeTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E7F4F7",
    justifyContent: "center",
    alignItems: "center",
  },
  chartHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    marginTop: 16,
  },
  axisLabel: {
    fontSize: 14,
    color: "#444444",
  },
  chartWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  lineChartOverlay: {
    position: "absolute",
    top: 0,
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rangeItem: {
    flex: 1,
    alignItems: "center",
  },
  rangePill: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 16,
  },
  rangePillActive: {
    backgroundColor: "#000000",
    paddingHorizontal: 10,
  },
  rangeText: {
    fontSize: 14,
    color: "#C0C0C0",
  },
  rangeTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
