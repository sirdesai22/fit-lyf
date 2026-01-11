import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HabitTrackerCard from '@/components/HabitTrackerCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Habit {
    id: string;
    name: string;
    streak: number;
    frequency: string;
    color: string;
    completions: number[]; // Array of 0s and 1s, index represents day-1
}

export default function HabitTrackerScreen() {
    const [habits, setHabits] = useState<Habit[]>([]);

    // Load habits from storage when component mounts
    useEffect(() => {
        loadHabits();
    }, []);

    // Save habits to storage whenever they change
    useEffect(() => {
        saveHabits();
    }, [habits]);

    const loadHabits = async () => {
        try {
            const storedHabits = await AsyncStorage.getItem('habits');
            if (storedHabits) {
                setHabits(JSON.parse(storedHabits));
            }
        } catch (error) {
            console.error('Error loading habits:', error);
        }
    };

    const saveHabits = async () => {
        try {
            await AsyncStorage.setItem('habits', JSON.stringify(habits));
        } catch (error) {
            console.error('Error saving habits:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Habit Tracker</Text>
            </View>
            <HabitTrackerCard 
                habits={habits}
                onHabitsChange={setHabits}
            />
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});