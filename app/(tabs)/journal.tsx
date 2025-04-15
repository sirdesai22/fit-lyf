import { Image, StyleSheet, Platform, TextInput, Text, ScrollView, View, Keyboard, ImageBackground } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState<any[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);
  const [totalFat, setTotalFat] = useState<number>(0);

  const saveData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const handleJourneyEntry = () => {
    if (userInput.trim() !== '') {
      const newChat = [...chat];
      newChat.push({ role: 'user', content: userInput });
      setChat(newChat);
      axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/journal/entry`,
        { journalEntry: userInput })
        .then(response => {
          console.debug(response.data[0]);
          if (response.data) {
            setChat([...newChat, { role: 'assistant', content: response.data[0] }]);
            setUserInput('');
            setTotalCalories(prev => prev + response.data[0].calories);
            setTotalCarbs(prev => prev + response.data[0].carbs);
            setTotalProtein(prev => prev + response.data[0].protein);
            setTotalFat(prev => prev + response.data[0].fat);
            saveData('journalEntries', chat);
            saveData('macros', { calories: totalCalories, carbs: totalCarbs, protein: totalProtein, fat: totalFat });
            checkAndResetData();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleDelete = async (index: number) => {
    console.log(index);
    const newChat = [...chat];
    const deletedEntry = newChat.splice(index, index + 2);
    
    setChat(newChat);
    saveData('journalEntries', newChat);
    const macros = await getData('macros');
    if (macros) {
      console.log(deletedEntry);
      const deletedEntryCalories = Number(deletedEntry[1].content.calories) || 0;
      const deletedEntryCarbs = Number(deletedEntry[1].content.carbs) || 0;
      const deletedEntryProtein = Number(deletedEntry[1].content.protein) || 0;
      const deletedEntryFat = Number(deletedEntry[1].content.fat) || 0;

      setTotalCalories(prev => prev - deletedEntryCalories);
      setTotalCarbs(prev => prev - deletedEntryCarbs);
      setTotalProtein(prev => prev - deletedEntryProtein);
      setTotalFat(prev => prev - deletedEntryFat);
      saveData('macros', { calories: totalCalories, carbs: totalCarbs, protein: totalProtein, fat: totalFat });
    }
    checkAndResetData();
  };

  const checkAndResetData = async () => {
    const today = new Date().toDateString();
    const lastUpdated = await getData('lastUpdated');

    if (lastUpdated !== today) {
      await saveData('storedArray', []); // Reset array
      await saveData('lastUpdated', today); // Update last updated date
    }
  };

  useEffect(() => {
    const loadChat = async () => {
      const savedChat = await getData('journalEntries');
      if (savedChat && savedChat.length > 0) {
        setChat(savedChat);
        const savedMacros = await getData('macros');
        if (savedMacros) {
          setTotalCalories(savedMacros.calories || 0);
          setTotalCarbs(savedMacros.carbs || 0);
          setTotalProtein(savedMacros.protein || 0);
          setTotalFat(savedMacros.fat || 0);
        }
      }
      checkAndResetData();
    };
    loadChat();
  }, []);

  useEffect(() => {
    checkAndResetData();
  }, [chat]);


  return (
    <ImageBackground
      source={require('../../assets/images/solo_level_bg.png')} // your image path
      style={styles.background}
      resizeMode="cover" // or 'contain', 'stretch'
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Journal your progress!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholderTextColor={'white'} placeholder="Enter food/exercise..." value={userInput} onChangeText={setUserInput} />
          <Button style={styles.button} onPress={() => { handleJourneyEntry(); Keyboard.dismiss(); }}><IconSymbol size={20} name="paperplane.fill" color={'white'} /></Button>
        </ThemedView>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <MaterialCommunityIcons name="fire" size={24} color="orange" />
            <Text style={styles.statsTitle}>Calories</Text>
            <Text style={styles.statsData}>{Math.floor(totalCalories)} Food</Text>
            <Text style={styles.statsData}>0 Exercise</Text>
            <Text style={styles.statsMain}>{1500 - Math.floor(totalCalories)} Remaining</Text>
          </View>
          <View style={styles.statsBox}>
            <MaterialCommunityIcons name="chart-pie" size={24} color="purple" />
            <Text style={styles.statsTitle}>Macros</Text>
            <Text style={styles.statsData}>{Math.floor(totalCarbs)}/188 Carbs (g)</Text>
            <Text style={styles.statsData}>{Math.floor(totalProtein)}/94 Protein (g)</Text>
            <Text style={styles.statsData}>{Math.floor(totalFat)}/42 Fat (g)</Text>
          </View>
        </View>

        <ScrollView style={styles.dataViewer}>

          {chat.map((message, index) => (
            <View key={index} style={{ marginBottom: 15 }}>

              {message.role === 'user' && (
                <View style={[styles.promptBox, { backgroundColor: '#1A202C' }]}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 }}>You</Text>
                  <Text style={{ color: '#fff', fontSize: 16 }}>Entry: {JSON.stringify(message.content)}</Text>
                  <View style={{ position: 'absolute', right: 10, top: 10, display: 'flex', flexDirection: 'row', gap: 7 }}>
                    {/* <MaterialCommunityIcons name="pencil" size={15} color="white" /> */}
                    <MaterialCommunityIcons name="delete" size={15} color="red" onPress={() => { handleDelete(index) }} />
                  </View>
                </View>
              )}

              {message.role === 'assistant' && (
                <View style={[styles.responseBox, { backgroundColor: '#2D3748' }]}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 }}>FitLyf</Text>

                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                    <View style={styles.macrosStatsData}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>{message.content.calories}</Text>
                      <Text style={{ color: '#ffffff85' }}>Calories</Text>
                    </View>
                    <View style={styles.macrosStatsData}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>{message.content.carbs}</Text>
                      <Text style={{ color: '#ffffff85' }}>Carbs</Text>
                    </View>
                    <View style={styles.macrosStatsData}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>{message.content.protein}</Text>
                      <Text style={{ color: '#ffffff85' }}>Protein</Text>
                    </View>
                    <View style={styles.macrosStatsData}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>{message.content.fat}</Text>
                      <Text style={{ color: '#ffffff85' }}>Fat</Text>
                    </View>
                  </View>

                  <View style={{ borderBottomWidth: 1, borderBottomColor: '#ffffff50', marginBottom: 15 }} />
                  <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: 400, color: '#CBD5E0' }}>{message.content.mealInfo}</Text>
                </View>
              )}
            </View>
          ))}

        </ScrollView>
      </ThemedView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  promptBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#272727',
    marginBottom: 8,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    borderColor: '#018bf4',
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
    paddingHorizontal: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#018bf4',
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
  statsBox: { flex: 1, backgroundColor: "#151d30", padding: 16, borderRadius: 12, marginRight: 8, borderColor: '#018bf4', borderWidth: 2, shadowColor: '#fff', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10, elevation: 15 },
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
