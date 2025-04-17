// HabitCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const HabitCard = ({ title, icon, color, progress = 20 }) => {
  const squares = Array.from({ length: 70 }, (_, i) => i);

  return (
    <View style={[styles.card, { borderColor: color + 'AA' }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {icon}
          <Text style={styles.title}>{title}</Text>
        </View>
        <MaterialIcons name="check-circle" size={24} color={color} />
      </View>

      <View style={styles.grid}>
        {squares.map((_, i) => (
          <View
            key={i}
            style={[
              styles.square,
              { backgroundColor: i < progress ? color : '#1e1e1e' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121212',
    padding: 12,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: 10,
    height: 10,
    margin: 2,
    borderRadius: 2,
  },
});

export default HabitCard;
