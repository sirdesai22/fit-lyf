// CalorieProgressCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CalorieProgressCard({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🔥 Calories Goal</Text>
      <Progress.Bar
        progress={data.consumed / data.target}
        width={300}
        color={'#018bf4'}
      />
      <Text style={styles.consumedText}>{data.consumed} / {data.target} kcal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#151d30', borderColor: '#018bf4', borderWidth: 2, borderRadius: 12, marginVertical: 10, width: '100%' },
  title: { color: '#fff', fontSize: 18, marginBottom: 8 },
  consumedText: { color: '#fff', fontSize: 15, marginTop: 8 }
});
