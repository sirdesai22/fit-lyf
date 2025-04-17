// HabitTrackerCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle, Circle } from 'lucide-react-native';

export default function HabitTrackerCard({ habits }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🧠 Habits</Text>
      {habits.map((habit, idx) => (
        <View key={idx} style={styles.habitRow}>
          {habit.status ? (
            <CheckCircle color="#00FFAB" size={20} />
          ) : (
            <Circle color="#aaa" size={20} />
          )}
          <Text style={styles.habitText}>{habit.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#151d30', borderColor: '#018bf4', borderWidth: 2, borderRadius: 12, marginVertical: 10, width: '100%' },
  title: { color: '#fff', fontSize: 18, marginBottom: 8 },
  habitRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  habitText: { marginLeft: 10, color: '#fff', fontSize: 16 }
});
