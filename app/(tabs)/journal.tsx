import { Image, StyleSheet, Platform, TextInput, Text, ScrollView, View, Keyboard, ImageBackground, Modal, Pressable, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button, Checkbox } from 'react-native-paper';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  // updatedAt?: Date;         // Optional: Last update timestamp
  // priority?: 'low' | 'medium' | 'high';  // Optional priority
  // notes?: string;           // Optional notes
};

export default function HomeScreen() {

  const [userInput, setUserInput] = useState('');
  const [showIncomplete, setShowInComplete] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewTask = async () => {
    if (!userInput) return;
    const newTask = { id: Date.now(), title: userInput, completed: false, createdAt: Date.now() };
    const updatedTasks = [...tasks, newTask];
    // console.log(newTask)

    try {
      await AsyncStorage.setItem('TASKS', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setUserInput('');
    } catch (e) {
      console.error('Error saving task:', e);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await AsyncStorage.getItem('TASKS');
        if (data) setTasks(JSON.parse(data));
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    };

    loadTasks();
  }, []);

  const incompleteTasks = tasks?.filter((task: Task) => !task.completed);
  const completedTasks = tasks?.filter((task: Task) => task.completed);


  const toggleTask = async (taskId: string) => {
    const updatedTasks = tasks?.map((task: Task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    try {
      await AsyncStorage.setItem('TASKS', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (e) {
      console.error('Error updating task:', e);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.navbar}>
        <Text style={styles.branding}>Journal</Text>
      </View>

      <View style={{ padding: 20 }}>
        {/* should reset after 3 hours.. */}
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>How is your mood?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, padding: 10 }}>

          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>😂</Text>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Happy</Text>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>😊</Text>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Good</Text>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>😐</Text>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Meh</Text>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>🙁</Text>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Sad</Text>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>😭</Text>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Cry</Text>
          </View>

        </View>
      </View>

      <ScrollView
        style={{ flex: 1, padding: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000050' }}>
            <View style={{ width: '90%', backgroundColor: '#121212', borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
              <TextInput placeholder='Enter new task' style={{borderWidth:2, width: '100%', borderRadius: 10, borderColor: '#fff'}}></TextInput>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>

              <Pressable
                style={{ marginTop: 10, padding: 10, backgroundColor: 'transparent', borderRadius: 10, borderWidth: 1, borderColor: '#fff' }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: '#fff'}}>Cancel</Text>
              </Pressable>
              <Pressable
                style={{ marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10 }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color:'#000'}}>Add Task</Text>
              </Pressable>
                  </View>
            </View>
          </View>
        </Modal>

          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Your Tasks</Text>
          <Text onPress={()=>setModalVisible(true)} style={{ color: '#000', backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 20, fontWeight: '600', paddingVertical: 2 }}>Add Task</Text>
        </View>

        {/* Incomplete Section */}
        <View style={styles.categoryViewBox}>
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Incomplete Tasks</Text>
          <Button onPress={() => setShowInComplete(!showIncomplete)}>
            <AntDesign name={showIncomplete ? "up" : "down"} size={24} color="white" />
          </Button>
        </View>

        {showIncomplete && (
          <View>
            {incompleteTasks?.map((task: Task, index) => (
              <View key={index} style={styles.taskCard}>
                <Checkbox onPress={() => toggleTask(task.id)} status="unchecked" color="#018bf4" />
                <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'left', color: 'white' }}>{task.title}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Completed Section */}
        <View style={styles.categoryViewBox}>
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Completed Tasks</Text>
          <Button onPress={() => setShowCompleted(!showCompleted)}>
            <AntDesign name={showCompleted ? "up" : "down"} size={24} color="white" />
          </Button>
        </View>

        {showCompleted && (
          <View>
            {completedTasks?.map((task: Task, index) => (
              <View key={index} style={styles.taskCard}>
                <Checkbox onPress={() => toggleTask(task.id)} status="checked" color="#018bf4" />
                <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'left', color: 'white' }}>{task.title}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#121212',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  branding: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  categoryViewBox: {
    backgroundColor: '#272727',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  taskCard: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0008',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#018bf4',
  },
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
    //padding: 20
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
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    paddingHorizontal: 30,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#018bf4',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
