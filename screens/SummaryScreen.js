// screens/SummaryScreen.js
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const chartWidth = Math.min(screenWidth - 32, 400);

// Mock data สำหรับแต่ละเดือน
const monthlyData = [
  { 
    month: "Jan", 
    anomaly: 0, 
    distance: 12, 
    monthName: "January 2025",
    dailyAnomalies: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.5, 0.3, 0.4, 0.8, 0.6, 0.4, 0.5, 0.3, 0.7, 0.4, 0.5, 0.3, 0.4, 0.9, 0.5, 0.3, 0.4, 0.6, 0.5, 0.4, 0.8, 0.2, 0.4, 0.5, 0.3, 0.7, 0.4, 0.5, 0.3, 0.6, 0.4]
  },
  { 
    month: "Feb", 
    anomaly: 2, 
    distance: 18, 
    monthName: "February 2025",
    dailyAnomalies: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.6, 0.7, 0.5, 0.8, 0.6, 0.7, 1.2, 0.9, 0.6, 0.5, 0.7, 0.8, 0.6, 1.1, 0.7, 0.6, 0.8, 0.5, 0.7, 0.6, 0.5, 0.8, 0.7, 0.6, 1.3, 0.7, 0.8, 0.6]
  },
  { 
    month: "Mar", 
    anomaly: 1, 
    distance: 21, 
    monthName: "March 2025",
    dailyAnomalies: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.7, 0.8, 0.6, 0.9, 0.7, 0.8, 0.6, 1.0, 0.7, 1.4, 0.8, 0.9, 0.7, 0.6, 0.8, 0.7, 0.9, 0.6, 0.8, 0.7, 0.6, 0.9, 0.8, 1.2, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 0.7]
  },
  { 
    month: "Apr", 
    anomaly: 3, 
    distance: 25, 
    monthName: "April 2025",
    dailyAnomalies: [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.8, 0.9, 0.7, 1.0, 0.8, 0.9, 0.7, 1.1, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.9, 0.8, 1.0, 0.7, 0.9, 0.8, 0.7, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.9]
  },
  { 
    month: "May", 
    anomaly: 2, 
    distance: 19, 
    monthName: "May 2025",
    dailyAnomalies: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.6, 0.7, 0.5, 0.8, 0.6, 0.7, 0.5, 0.9, 0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 0.6, 0.8, 0.5, 0.7, 0.6, 0.5, 0.8, 0.7, 0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 0.6]
  },
  { 
    month: "Jun", 
    anomaly: 1, 
    distance: 23, 
    monthName: "June 2025",
    dailyAnomalies: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.8, 0.9, 0.7, 1.0, 0.8, 0.9, 0.7, 1.1, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.9, 0.8, 1.0, 0.7, 0.9, 0.8, 0.7, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.9]
  },
  { 
    month: "Jul", 
    anomaly: 4, 
    distance: 2.8, 
    monthName: "July 2025",
    dailyAnomalies: [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.9, 1.0, 0.8, 1.1, 0.9, 1.0, 0.8, 1.2, 0.9, 0.8, 1.0, 1.1, 0.9, 0.8, 1.0, 0.9, 1.1, 0.8, 1.0, 0.9, 0.8, 1.1, 1.0, 0.9, 0.8, 1.0, 1.1, 0.9, 0.8, 1.0, 0.9]
  },
  { 
    month: "Aug", 
    anomaly: 2, 
    distance: 2.2, 
    monthName: "August 2025",
    dailyAnomalies: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.7, 0.8, 0.6, 0.9, 0.7, 0.8, 0.6, 1.0, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 0.7, 0.9, 0.6, 0.8, 0.7, 0.6, 0.9, 0.8, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 0.7]
  },
  { 
    month: "Sep", 
    anomaly: 0, 
    distance: 1.7, 
    monthName: "September 2025",
    dailyAnomalies: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.5, 0.6, 0.4, 0.7, 0.5, 0.6, 0.4, 0.8, 0.5, 0.4, 0.6, 0.7, 0.5, 0.4, 0.6, 0.5, 0.7, 0.4, 0.6, 0.5, 0.4, 0.7, 0.6, 0.5, 0.4, 0.6, 0.7, 0.5, 0.4, 0.6]
  },
  { 
    month: "Oct", 
    anomaly: 1, 
    distance: 2.0, 
    monthName: "October 2025",
    dailyAnomalies: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.6, 0.7, 0.5, 0.8, 0.6, 0.7, 0.5, 0.9, 0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 0.6, 0.8, 0.5, 0.7, 0.6, 0.5, 0.8, 0.7, 0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 0.6]
  },
  { 
    month: "Nov", 
    anomaly: 3, 
    distance: 2.4, 
    monthName: "November 2025",
    dailyAnomalies: [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.8, 0.9, 0.7, 1.0, 0.8, 0.9, 0.7, 1.1, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.9, 0.8, 1.0, 0.7, 0.9, 0.8, 0.7, 1.0, 0.9, 0.8, 0.7, 0.9, 1.0, 0.8, 0.7, 0.9]
  },
  { 
    month: "Dec", 
    anomaly: 2, 
    distance: 2.1, 
    monthName: "December 2025",
    dailyAnomalies: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dailyDistances: [0.7, 0.8, 0.6, 0.9, 0.7, 0.8, 0.6, 1.0, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 0.7, 0.9, 0.6, 0.8, 0.7, 0.6, 0.9, 0.8, 0.7, 0.6, 0.8, 0.9, 0.7, 0.6, 0.8, 0.7]
  },
];

// Mock data สำหรับช่วงเวลาต่างๆ
const mockData = {
  "3m": {
    anomalyData: [0, 2, 1, 3, 2, 1, 4, 2, 0, 1, 3, 2],
    distanceData: [1.2, 1.8, 2.1, 2.5, 1.9, 2.3, 2.8, 2.2, 1.7, 2.0, 2.4, 2.1],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    totalAnomalies: 21,
    totalDistance: 26.0,
    avgDistance: 2.17
  },
  "6m": {
    anomalyData: [1, 3, 2, 4, 1, 2, 5, 3, 1, 2, 4, 3, 0, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 1],
    distanceData: [1.5, 2.2, 2.8, 3.1, 2.4, 2.9, 3.5, 2.7, 2.1, 2.6, 3.2, 2.8, 1.9, 2.5, 2.2, 2.9, 2.4, 3.0, 2.1, 2.7, 3.1, 2.3, 2.8, 2.5],
    labels: [],
    totalAnomalies: 52,
    totalDistance: 62.5,
    avgDistance: 2.6
  },
  "1y": {
    anomalyData: [2, 4, 3, 1, 2, 5, 3, 2, 1, 4, 3, 2],
    distanceData: [2.1, 2.8, 3.2, 2.5, 2.9, 3.5, 3.1, 2.7, 2.3, 3.0, 3.4, 2.9],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    totalAnomalies: 32,
    totalDistance: 34.4,
    avgDistance: 2.87
  },
  "2y": {
    anomalyData: [3, 5, 4, 2, 3, 6, 4, 3, 2, 5, 4, 3, 2, 4, 3, 1, 2, 5, 3, 2, 1, 4, 3, 2],
    distanceData: [2.3, 3.1, 3.5, 2.8, 3.2, 3.8, 3.4, 3.0, 2.6, 3.3, 3.7, 3.2, 2.4, 2.9, 3.1, 2.7, 3.0, 3.6, 3.2, 2.8, 2.5, 3.1, 3.4, 3.0],
    labels: [],
    totalAnomalies: 74,
    totalDistance: 74.1,
    avgDistance: 3.09
  },
  "Max": {
    anomalyData: [4, 6, 5, 3, 4, 7, 5, 4, 3, 6, 5, 4],
    distanceData: [2.5, 3.3, 3.7, 3.0, 3.4, 4.0, 3.6, 3.2, 2.8, 3.5, 3.9, 3.4],
    labels: ["2020", "2021", "2022", "2023", "2025", "2025"],
    totalAnomalies: 156,
    totalDistance: 185.7,
    avgDistance: 3.18
  }
};

const SummaryScreen = () => {
  const [selectedRange, setSelectedRange] = useState("1y");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(10); // November
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const monthListRef = useRef(null);
  
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });
    return () => subscription?.remove();
  }, []);
  
  const currentData = mockData[selectedRange];
  const selectedMonth = monthlyData[selectedMonthIndex];

  // คำนวณข้อมูลรวมจาก monthlyData
  const totalAnomalies = monthlyData.reduce((sum, month) => sum + month.anomaly, 0);
  const totalDistance = monthlyData.reduce((sum, month) => sum + month.distance, 0);
  const avgDistance = totalDistance / monthlyData.length;

  // สร้าง labels สำหรับวันในเดือน
  const getDayLabels = (monthData) => {
    const daysInMonth = monthData.dailyDistances.length;
    const labels = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if (i === 1 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25 || i === daysInMonth) {
        labels.push(i.toString());
      } else {
        labels.push('');
      }
    }
    return labels;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile icon */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Summary</Text>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons name="person" size={24} color="#4F7D81" />
          </TouchableOpacity>
        </View>

        {/* Summary cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Anomaly</Text>
            <Text style={styles.summaryValue}>{totalAnomalies}</Text>
            <Text style={styles.summaryUnit}>time</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Distance</Text>
            <Text style={styles.summaryValue}>{totalDistance.toFixed(1)}</Text>
            <Text style={styles.summaryUnit}>km</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>avgDistance</Text>
            <Text style={styles.summaryValue}>{avgDistance.toFixed(2)}</Text>
            <Text style={styles.summaryUnit}>km/day</Text>
          </View>
        </View>

        {/* Month Slider */}
        <View style={styles.monthSliderContainer}>
          <Text style={styles.monthSliderTitle}>Select Month</Text>
          <FlatList
            ref={monthListRef}
            data={monthlyData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.monthSliderContent}
            renderItem={({ item, index }) => {
              const isSelected = index === selectedMonthIndex;
              return (
                <TouchableOpacity
                  style={[
                    styles.monthItem,
                    isSelected && styles.monthItemSelected
                  ]}
                  onPress={() => {
                    setSelectedMonthIndex(index);
                    monthListRef.current?.scrollToIndex({
                      index,
                      animated: true,
                      viewPosition: 0.5
                    });
                  }}
                >
                  <Text style={[
                    styles.monthText,
                    isSelected && styles.monthTextSelected
                  ]}>
                    {item.month}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.selectedMonthName}>{selectedMonth.monthName}</Text>
        </View>

        {/* Current Month Stats */}
        <View style={styles.currentMonthStats}>
          <View style={styles.monthStatCard}>
            <Text style={styles.monthStatLabel}>This Month Anomaly</Text>
            <Text style={styles.monthStatValue}>{selectedMonth.anomaly}</Text>
            <Text style={styles.monthStatUnit}>time</Text>
          </View>
          <View style={styles.monthStatCard}>
            <Text style={styles.monthStatLabel}>This Month Distance</Text>
            <Text style={styles.monthStatValue}>{selectedMonth.distance}</Text>
            <Text style={styles.monthStatUnit}>km</Text>
          </View>
        </View>


        {/* Distance Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#FF8C1A" }]} />
              <Text style={styles.axisLabel}>Distance (km)</Text>
            </View>
          </View>
          
          <View style={styles.chartWrapper}>
            <View style={styles.staticChartFrame}>
              {/* Y-Axis (Static) */}
              <View style={styles.staticYAxis}>
                <Text style={styles.yAxisLabel}>2.0</Text>
                <Text style={styles.yAxisLabel}>1.5</Text>
                <Text style={styles.yAxisLabel}>1.0</Text>
                <Text style={styles.yAxisLabel}>0.5</Text>
                <Text style={styles.yAxisLabel}>0.0</Text>
              </View>
              
              {/* Chart Content Area */}
              <View style={styles.chartContentArea}>
                {/* Grid Lines (Static) */}
                <View style={styles.staticGridLines}>
                  {[0, 1, 2, 3, 4].map((line) => (
                    <View key={line} style={styles.gridLine} />
                  ))}
                </View>
                
                {/* Scrollable Chart Data */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={true}
                  style={styles.chartScrollView}
                  contentContainerStyle={styles.chartScrollContent}
                >
                  <View style={styles.chartDataContainer}>
                    {selectedMonth.dailyDistances.map((value, index) => {
                      const maxValue = 2.0;
                      const barHeight = Math.max((value / maxValue) * 140, 2);
                      return (
                        <View key={index} style={styles.dataColumn}>
                          <View style={styles.dataArea}>
                            <View 
                              style={[
                                styles.distanceBar, 
                                { 
                                  height: barHeight,
                                  bottom: 0
                                }
                              ]} 
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                
                {/* X-Axis (Static) */}
                <View style={styles.staticXAxis}>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.xAxisScrollView}
                    contentContainerStyle={styles.xAxisScrollContent}
                  >
                    <View style={styles.xAxisLabels}>
                      {selectedMonth.dailyDistances.map((_, index) => (
                        <View key={index} style={styles.xAxisLabelContainer}>
                          <Text style={styles.xAxisLabel}>{index + 1}</Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Anomaly Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: "#888888" }]} />
              <Text style={styles.axisLabel}>Anomaly (times)</Text>
            </View>
          </View>
          
          <View style={styles.chartWrapper}>
            <View style={styles.staticChartFrame}>
              {/* Y-Axis (Static) */}
              <View style={styles.staticYAxis}>
                <Text style={styles.yAxisLabel}>4</Text>
                <Text style={styles.yAxisLabel}>3</Text>
                <Text style={styles.yAxisLabel}>2</Text>
                <Text style={styles.yAxisLabel}>1</Text>
                <Text style={styles.yAxisLabel}>0</Text>
              </View>
              
              {/* Chart Content Area */}
              <View style={styles.chartContentArea}>
                {/* Grid Lines (Static) */}
                <View style={styles.staticGridLines}>
                  {[0, 1, 2, 3, 4].map((line) => (
                    <View key={line} style={styles.gridLine} />
                  ))}
                </View>
                
                {/* Scrollable Chart Data */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={true}
                  style={styles.chartScrollView}
                  contentContainerStyle={styles.chartScrollContent}
                >
                  <View style={styles.chartDataContainer}>
                    {selectedMonth.dailyAnomalies.map((value, index) => {
                      const maxValue = 4;
                      const dotPosition = value > 0 ? (140 - (value / maxValue) * 140) : null;
                      return (
                        <View key={index} style={styles.dataColumn}>
                          <View style={styles.dataArea}>
                            {value > 0 && (
                              <View 
                                style={[
                                  styles.anomalyDot, 
                                  { top: dotPosition }
                                ]} 
                              />
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                
                {/* X-Axis (Static) */}
                <View style={styles.staticXAxis}>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.xAxisScrollView}
                    contentContainerStyle={styles.xAxisScrollContent}
                  >
                    <View style={styles.xAxisLabels}>
                      {selectedMonth.dailyAnomalies.map((_, index) => (
                        <View key={index} style={styles.xAxisLabelContainer}>
                          <Text style={styles.xAxisLabel}>{index + 1}</Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: screenWidth < 400 ? 12 : 20,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "System",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E7F4F7",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: screenWidth < 400 ? 8 : 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  summaryTitle: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "System",
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
    fontFamily: "System",
  },
  summaryUnit: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "400",
    fontFamily: "System",
  },
  monthSliderContainer: {
    marginBottom: 20,
  },
  monthSliderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
    fontFamily: "System",
  },
  monthSliderContent: {
    paddingHorizontal: 10,
  },
  monthItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  monthItemSelected: {
    backgroundColor: "#000000",
  },
  monthText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
    fontFamily: "System",
  },
  monthTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  selectedMonthName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginTop: 12,
    fontFamily: "System",
  },
  currentMonthStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  monthStatCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  monthStatLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "500",
    fontFamily: "System",
  },
  monthStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
    fontFamily: "System",
  },
  monthStatUnit: {
    fontSize: 11,
    color: "#888888",
    fontWeight: "400",
    fontFamily: "System",
  },
  chartHeaderRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  chartSection: {
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  axisLabel: {
    fontSize: 15,
    color: "#333333",
    fontWeight: "600",
    fontFamily: "System",
  },
  chartWrapper: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 4,
  },
  staticChartFrame: {
    width: "100%",
    maxWidth: chartWidth,
    height: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  staticYAxis: {
    position: "absolute",
    left: 16,
    top: 16,
    width: 40,
    height: 140,
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  chartContentArea: {
    flex: 1,
    marginLeft: 50,
    marginTop: 4,
  },
  staticGridLines: {
    position: "absolute",
    top: 4,
    left: 0,
    right: 16,
    height: 140,
    justifyContent: "space-between",
  },
  gridLine: {
    height: 1,
    backgroundColor: "#E2E8F0",
    opacity: 0.8,
  },
  chartScrollView: {
    height: 140,
    marginTop: 4,
  },
  chartScrollContent: {
    paddingHorizontal: 8,
  },
  chartDataContainer: {
    flexDirection: "row",
    height: 140,
    alignItems: "flex-end",
  },
  dataColumn: {
    width: screenWidth < 400 ? 16 : 20,
    height: 140,
    marginHorizontal: screenWidth < 400 ? 1 : 1.5,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dataArea: {
    width: screenWidth < 400 ? 12 : 16,
    height: 140,
    position: "relative",
  },
  staticXAxis: {
    height: 30,
    marginLeft: -8,
    marginTop: 8,
  },
  xAxisScrollView: {
    height: 30,
  },
  xAxisScrollContent: {
    paddingHorizontal: 8,
  },
  xAxisLabels: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
  },
  xAxisLabelContainer: {
    width: screenWidth < 400 ? 19 : 23,
    alignItems: "center",
  },
  xAxisLabel: {
    fontSize: 10,
    color: "#4A5568",
    fontWeight: "500",
    fontFamily: "System",
  },
  yAxisLabel: {
    fontSize: 12,
    color: "#4A5568",
    fontFamily: "System",
    textAlign: "right",
    fontWeight: "500",
  },
  anomalyDot: {
    width: screenWidth < 400 ? 6 : 8,
    height: screenWidth < 400 ? 6 : 8,
    backgroundColor: "#6B7280",
    borderRadius: screenWidth < 400 ? 3 : 4,
    position: "absolute",
    left: screenWidth < 400 ? 3 : 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  distanceBar: {
    width: screenWidth < 400 ? 10 : 14,
    backgroundColor: "#FF8C1A",
    borderRadius: screenWidth < 400 ? 4 : 6,
    borderTopLeftRadius: screenWidth < 400 ? 4 : 6,
    borderTopRightRadius: screenWidth < 400 ? 4 : 6,
    position: "absolute",
    left: screenWidth < 400 ? 1 : 1,
    shadowColor: "#FF8C1A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  barChartFrame: {
    width: chartWidth,
    height: 230,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  anomalyChartFrame: {
    width: chartWidth,
    height: 230,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  barChartScrollView: {
    flex: 1,
  },
  anomalyChartScrollView: {
    flex: 1,
  },
  barChartContainer: {
    paddingHorizontal: 8,
    minWidth: chartWidth - 24,
  },
  anomalyChartContainer: {
    paddingHorizontal: 8,
    minWidth: chartWidth - 24,
  },
  customBarChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 180,
  },
  customAnomalyChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 180,
  },
  yAxisLabels: {
    height: 140,
    justifyContent: "space-between",
    marginRight: 16,
    paddingVertical: 6,
    width: 35,
  },
  yAxisLabel: {
    fontSize: 13,
    color: "#4A5568",
    fontFamily: "System",
    textAlign: "right",
    fontWeight: "500",
  },
  chartArea: {
    flex: 1,
    position: "relative",
    maxHeight: 140,
  },
  gridLines: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 160,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  gridLine: {
    height: 1,
    backgroundColor: "#E2E8F0",
    opacity: 0.8,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    paddingTop: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    paddingTop: 10,
  },
  barWrapper: {
    alignItems: "center",
    marginHorizontal: 3,
    width: 28,
  },
  dotWrapper: {
    alignItems: "center",
    marginHorizontal: 3,
    width: 28,
  },
  barContainer: {
    height: 160,
    width: 24,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dotContainer: {
    height: 160,
    width: 24,
    position: "relative",
    alignItems: "center",
  },
  bar: {
    width: 18,
    backgroundColor: "#FF8C1A",
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 4,
    shadowColor: "#FF8C1A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  anomalyDot: {
    width: 10,
    height: 10,
    backgroundColor: "#6B7280",
    borderRadius: 5,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  dayLabel: {
    fontSize: 11,
    color: "#4A5568",
    marginTop: 8,
    fontFamily: "System",
    textAlign: "center",
    width: 20,
    fontWeight: "500",
  },
  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 20,
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
    fontWeight: "500",
    fontFamily: "System",
  },
  rangeTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: "System",
  },
});
