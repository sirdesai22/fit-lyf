import { Image, StyleSheet, Platform, TextInput, Text, ScrollView, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.content}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Journal your progress!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.textInputContainer}>
        <TextInput style={styles.textInput} placeholderTextColor={'white'} placeholder="Enter food/exercise..." />
        <Button style={styles.button} ><IconSymbol size={20} name="paperplane.fill" color={'white'} /></Button>
      </ThemedView>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <MaterialCommunityIcons name="fire" size={24} color="orange" />
          <Text style={styles.statsTitle}>Calories</Text>
          <Text style={styles.statsData}>0 Food</Text>
          <Text style={styles.statsData}>0 Exercise</Text>
          <Text style={styles.statsMain}>1500 Remaining</Text>
        </View>
        <View style={styles.statsBox}>
          <MaterialCommunityIcons name="chart-pie" size={24} color="purple" />
          <Text style={styles.statsTitle}>Macros</Text>
          <Text style={styles.statsData}>0/188 Carbs (g)</Text>
          <Text style={styles.statsData}>0/94 Protein (g)</Text>
          <Text style={styles.statsData}>0/42 Fat (g)</Text>
        </View>
      </View>

      <ScrollView style={styles.dataViewer}>

        {[1, 2, 3, 4].map(i => (
          <View key={i} style={{ marginBottom: 15 }}>
            <View style={[styles.promptBox, { backgroundColor: '#1A202C' }]}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 }}>You</Text>
              <Text style={{ color: '#fff', fontSize: 16 }}>Prompt: 200g of chicken breast, 100g of broccoli, 100g of rice</Text>
            </View>

            <View style={[styles.responseBox, { backgroundColor: '#2D3748' }]}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 }}>FitLyf</Text>

              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                <View style={styles.macrosStatsData}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>280</Text>
                  <Text style={{ color: '#ffffff85' }}>Calories</Text>
                </View>
                <View style={styles.macrosStatsData}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>80g</Text>
                  <Text style={{ color: '#ffffff85' }}>Carbs</Text>
                </View>
                <View style={styles.macrosStatsData}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>10g</Text>
                  <Text style={{ color: '#ffffff85' }}>Protein</Text>
                </View>
                <View style={styles.macrosStatsData}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>2g</Text>
                  <Text style={{ color: '#ffffff85' }}>Fat</Text>
                </View>
              </View>

              <View style={{borderBottomWidth: 1, borderBottomColor: '#ffffff50', marginBottom: 15}} />


              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: 400, color: '#CBD5E0' }}>This meal consists of 200ml of milk, which provides about 100 calories, 10g of carbs, 8g of protein, and 5g of fat. The 50g of oats adds approximately 190 calories, 33g of carbs, 7g of protein, and 3g of fat. The 10g of dry fruits mix contributes around 40 calories, 10g of carbs, 1g of protein, and 2g of fat. One tablespoon of honey adds about 64 calories and 17g of carbs. Finally, the two eggs provide around 140 calories, 2g of carbs, 12g of protein, and 10g of fat. When combined, these ingredients create a nutritious meal rich in carbohydrates, protein, and healthy fats.</Text>
            </View>
          </View>
        ))}

      </ScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  promptBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#272727',
    marginBottom: 8,
  },
  responseBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#00000050',
    marginBottom: 8,
  },
  macrosStatsData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  titleContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  content: {
    flex: 1,
    padding: 25,
    paddingTop: 35,
    gap: 15,
    overflow: 'hidden',
    height: '100%',
  },
  dataViewer: {
    flex: 1,
    overflow: 'scroll',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  foodsImage: {
    height: 250,
    width: '100%',
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#808080',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 12,
    color: '#fff',
    position: 'relative',
    bottom: 0,
  },
  textInputContainer: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CAC78',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  container: { flex: 1, padding: 16, backgroundColor: "white" },

  // Header
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  headerIcons: { flexDirection: "row" },

  // Date Selector
  dateSelector: { flexDirection: "row", marginBottom: 16 },
  dateBox: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, marginRight: 8 },
  dateBoxRed: { backgroundColor: "#F8D7DA" },
  dateBoxGreen: { backgroundColor: "#D4EDDA" },
  dateText: { fontSize: 14, fontWeight: "500" },

  // Stats
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  statsBox: { flex: 1, backgroundColor: "#272727", padding: 16, borderRadius: 12, marginRight: 8 },
  statsTitle: { fontSize: 16, fontWeight: "bold", marginTop: 4, color: 'white' },
  statsData: { fontSize: 14, color: "#ffffff70" },
  statsMain: { fontSize: 18, fontWeight: "bold", marginTop: 4, color: '#fff' },

  // Water Section
  waterSection: { backgroundColor: "#fff", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", marginBottom: 16 },
  waterTitle: { fontSize: 16, fontWeight: "bold" },
  waterTracker: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  waterControl: { fontSize: 24, fontWeight: "bold", paddingHorizontal: 12 },
  waterInfo: { alignItems: "center" },
  waterAmount: { fontSize: 18, fontWeight: "bold" },
  waterRemaining: { fontSize: 14, color: "gray" },

  // Chat Input
  chatInputContainer: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 50, backgroundColor: "#F1F3F5", position: "absolute", bottom: 16, left: 16, right: 16 },
  chatInput: { flex: 1, fontSize: 16, marginLeft: 10 },
});
