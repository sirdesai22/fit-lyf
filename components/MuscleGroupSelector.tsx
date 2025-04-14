import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MuscleGroupVisualizer() {
  // Define all muscle groups with initial state (false = gray, true = green)
  const [muscleStates, setMuscleStates] = useState({
    chest: false,
    abs: false,
    shoulders: false,
    biceps: false,
    forearms: false,
    quads: false,
    calves: false,
    traps: false,
    lats: false,
    midBack: false,
    lowerBack: false,
    glutes: false,
    hamstrings: false,
  });

  // Toggle function for muscle groups
  const toggleMuscle = (muscleGroup) => {
    setMuscleStates({
      ...muscleStates,
      [muscleGroup]: !muscleStates[muscleGroup],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Interactive Muscle Map</Text>
      <Text style={styles.subtitle}>Tap on muscle groups to highlight</Text>
      
      <View style={styles.bodyContainer}>
        {/* Front View */}
        <View style={styles.bodyView}>
          <Text style={styles.viewLabel}>Front View</Text>
          <View style={styles.body}>
            {/* Head */}
            <View style={styles.head} />
            
            {/* Shoulders */}
            <TouchableOpacity 
              style={[
                styles.shoulders, 
                {backgroundColor: muscleStates.shoulders ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('shoulders')}
            />
            
            {/* Chest */}
            <TouchableOpacity 
              style={[
                styles.chest, 
                {backgroundColor: muscleStates.chest ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('chest')}
            />
            
            {/* Biceps */}
            <View style={styles.armsContainer}>
              <TouchableOpacity 
                style={[
                  styles.biceps, 
                  {backgroundColor: muscleStates.biceps ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('biceps')}
              />
              <TouchableOpacity 
                style={[
                  styles.biceps, 
                  styles.rightArm,
                  {backgroundColor: muscleStates.biceps ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('biceps')}
              />
            </View>
            
            {/* Forearms */}
            <View style={styles.forearmsContainer}>
              <TouchableOpacity 
                style={[
                  styles.forearms, 
                  {backgroundColor: muscleStates.forearms ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('forearms')}
              />
              <TouchableOpacity 
                style={[
                  styles.forearms, 
                  styles.rightArm,
                  {backgroundColor: muscleStates.forearms ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('forearms')}
              />
            </View>
            
            {/* Abs */}
            <TouchableOpacity 
              style={[
                styles.abs, 
                {backgroundColor: muscleStates.abs ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('abs')}
            />
            
            {/* Quads */}
            <View style={styles.legsContainer}>
              <TouchableOpacity 
                style={[
                  styles.quads, 
                  {backgroundColor: muscleStates.quads ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('quads')}
              />
              <TouchableOpacity 
                style={[
                  styles.quads, 
                  styles.rightLeg,
                  {backgroundColor: muscleStates.quads ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('quads')}
              />
            </View>
            
            {/* Calves */}
            <View style={styles.calvesContainer}>
              <TouchableOpacity 
                style={[
                  styles.calves, 
                  {backgroundColor: muscleStates.calves ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('calves')}
              />
              <TouchableOpacity 
                style={[
                  styles.calves, 
                  styles.rightLeg,
                  {backgroundColor: muscleStates.calves ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('calves')}
              />
            </View>
          </View>
        </View>
        
        {/* Back View */}
        <View style={styles.bodyView}>
          <Text style={styles.viewLabel}>Back View</Text>
          <View style={styles.body}>
            {/* Head */}
            <View style={styles.head} />
            
            {/* Traps */}
            <TouchableOpacity 
              style={[
                styles.traps, 
                {backgroundColor: muscleStates.traps ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('traps')}
            />
            
            {/* Lats */}
            <View style={styles.backContainer}>
              <TouchableOpacity 
                style={[
                  styles.lats, 
                  {backgroundColor: muscleStates.lats ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('lats')}
              />
              <TouchableOpacity 
                style={[
                  styles.lats, 
                  styles.rightLat,
                  {backgroundColor: muscleStates.lats ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('lats')}
              />
            </View>
            
            {/* Mid Back */}
            <TouchableOpacity 
              style={[
                styles.midBack, 
                {backgroundColor: muscleStates.midBack ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('midBack')}
            />
            
            {/* Lower Back */}
            <TouchableOpacity 
              style={[
                styles.lowerBack, 
                {backgroundColor: muscleStates.lowerBack ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('lowerBack')}
            />
            
            {/* Triceps (back of arms) */}
            <View style={styles.armsContainer}>
              <TouchableOpacity 
                style={[
                  styles.triceps, 
                  {backgroundColor: muscleStates.biceps ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('biceps')}
              />
              <TouchableOpacity 
                style={[
                  styles.triceps, 
                  styles.rightArm,
                  {backgroundColor: muscleStates.biceps ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('biceps')}
              />
            </View>
            
            {/* Glutes */}
            <TouchableOpacity 
              style={[
                styles.glutes, 
                {backgroundColor: muscleStates.glutes ? '#4CAF50' : '#888'}
              ]}
              onPress={() => toggleMuscle('glutes')}
            />
            
            {/* Hamstrings */}
            <View style={styles.legsContainer}>
              <TouchableOpacity 
                style={[
                  styles.hamstrings, 
                  {backgroundColor: muscleStates.hamstrings ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('hamstrings')}
              />
              <TouchableOpacity 
                style={[
                  styles.hamstrings, 
                  styles.rightLeg,
                  {backgroundColor: muscleStates.hamstrings ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('hamstrings')}
              />
            </View>
            
            {/* Back of Calves */}
            <View style={styles.calvesContainer}>
              <TouchableOpacity 
                style={[
                  styles.calves, 
                  {backgroundColor: muscleStates.calves ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('calves')}
              />
              <TouchableOpacity 
                style={[
                  styles.calves, 
                  styles.rightLeg,
                  {backgroundColor: muscleStates.calves ? '#4CAF50' : '#888'}
                ]}
                onPress={() => toggleMuscle('calves')}
              />
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.legend}>
        <Text style={styles.legendText}>
          Selected muscles: {Object.keys(muscleStates).filter(key => muscleStates[key]).join(', ')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  bodyView: {
    alignItems: 'center',
  },
  viewLabel: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  body: {
    height: 400,
    width: 150,
    alignItems: 'center',
    position: 'relative',
  },
  head: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#555',
    marginBottom: 5,
  },
  shoulders: {
    width: 100,
    height: 20,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  chest: {
    width: 80,
    height: 40,
    backgroundColor: '#888',
    borderRadius: 10,
    marginTop: 5,
  },
  armsContainer: {
    flexDirection: 'row',
    width: 130,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 45,
  },
  biceps: {
    width: 15,
    height: 50,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  rightArm: {
    alignSelf: 'flex-end',
  },
  triceps: {
    width: 15,
    height: 50,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  forearmsContainer: {
    flexDirection: 'row',
    width: 140,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 100,
  },
  forearms: {
    width: 12,
    height: 45,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  abs: {
    width: 50,
    height: 70,
    backgroundColor: '#888',
    borderRadius: 5,
    marginTop: 10,
  },
  legsContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quads: {
    width: 25,
    height: 80,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  rightLeg: {
    alignSelf: 'flex-end',
  },
  calvesContainer: {
    flexDirection: 'row',
    width: 90,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  calves: {
    width: 20,
    height: 60,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  backContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  traps: {
    width: 60,
    height: 20,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  lats: {
    width: 25,
    height: 60,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  rightLat: {
    alignSelf: 'flex-end',
  },
  midBack: {
    width: 60,
    height: 40,
    backgroundColor: '#888',
    borderRadius: 5,
    marginTop: 5,
  },
  lowerBack: {
    width: 40,
    height: 25,
    backgroundColor: '#888',
    borderRadius: 5,
    marginTop: 5,
  },
  glutes: {
    width: 60,
    height: 30,
    backgroundColor: '#888',
    borderRadius: 15,
    marginTop: 10,
  },
  hamstrings: {
    width: 25,
    height: 70,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  legend: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    maxWidth: '100%',
  },
  legendText: {
    color: '#fff',
    textAlign: 'center',
  },
});