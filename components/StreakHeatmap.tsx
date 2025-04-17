// StreakHeatmap.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StreakHeatmap({ streaks }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Logging Streaks</Text>
      <View style={styles.grid}>
        {streaks.map((day, idx) => (
          <View
            key={idx}
            style={[styles.box, { backgroundColor: getColor(day) }]}
          />
        ))}
      </View>
    </View>
  );
}

const getColor = (value) => {
  if (value === 0) return '#2e2e2e';
  if (value < 2) return '#63b3ed';
  if (value < 4) return '#4299e1';
  return '#3182ce';
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, width: '100%' },
  title: { fontSize: 18, color: '#fff', marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', width: 200 },
  box: { width: 14, height: 14, margin: 2, borderRadius: 2 }
});
