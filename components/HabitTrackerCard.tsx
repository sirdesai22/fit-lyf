import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Button, TextInput, Portal } from 'react-native-paper';
import CustomHeatMap from './CustomHeatMap';

interface Habit {
    id: string;
    name: string;
    streak: number;
    frequency: string;
    color: string;
    completions: number[]; // Array of 0s and 1s, index represents day-1
}

// Function to get today's date (0-30)
const getTodayIndex = () => {
    const today = new Date();
    return today.getDate() - 1; // Convert to 0-based index
};

interface HabitTrackerCardProps {
    habits: Habit[];
    onHabitsChange: (habits: Habit[]) => void;
}

export default function HabitTrackerCard({ habits, onHabitsChange }: HabitTrackerCardProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
    const [editHabitName, setEditHabitName] = useState('');
    const [editHabitFrequency, setEditHabitFrequency] = useState('');
    const [editHabitColor, setEditHabitColor] = useState('');
    const [newHabitName, setNewHabitName] = useState('');
    const [newHabitFrequency, setNewHabitFrequency] = useState('');
    const [newHabitColor, setNewHabitColor] = useState('#FF6B6B');

    // Function to toggle habit completion for today
    const toggleHabitCompletion = (habitId: string) => {
        const todayIndex = getTodayIndex();
        const updatedHabits = habits.map(habit => {
            if (habit.id === habitId) {
                const newCompletions = [...habit.completions];
                newCompletions[todayIndex] = newCompletions[todayIndex] === 1 ? 0 : 1;
                
                // Calculate streak
                let streak = 0;
                if (newCompletions[todayIndex] === 1) {
                    streak = 1;
                    // Check previous days
                    for (let i = todayIndex - 1; i >= 0; i--) {
                        if (newCompletions[i] === 1) {
                            streak++;
                        } else {
                            break;
                        }
                    }
                }

                return {
                    ...habit,
                    completions: newCompletions,
                    streak
                };
            }
            return habit;
        });
        onHabitsChange(updatedHabits);
    };

    const handleAddHabit = () => {
        if (!newHabitName || !newHabitFrequency) return;

        const newHabit: Habit = {
            id: Date.now().toString(),
            name: newHabitName,
            streak: 0,
            frequency: newHabitFrequency,
            color: newHabitColor,
            completions: Array(31).fill(0)
        };

        onHabitsChange([...habits, newHabit]);
        setModalVisible(false);
        setNewHabitName('');
        setNewHabitFrequency('');
        setNewHabitColor('#FF6B6B');
    };

    const handleEditHabit = () => {
        if (!selectedHabit || !editHabitName || !editHabitFrequency) return;

        const updatedHabits = habits.map(habit => 
            habit.id === selectedHabit.id 
                ? { ...habit, name: editHabitName, frequency: editHabitFrequency, color: editHabitColor }
                : habit
        );

        onHabitsChange(updatedHabits);
        setEditModalVisible(false);
        setSelectedHabit(null);
    };

    const handleDeleteHabit = () => {
        if (!selectedHabit) return;

        const updatedHabits = habits.filter(habit => habit.id !== selectedHabit.id);
        onHabitsChange(updatedHabits);
        setEditModalVisible(false);
        setSelectedHabit(null);
    };

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
                <Button 
                    style={{backgroundColor:'#fff', width:120}}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{color: '#000', fontSize: 15, fontWeight: '700'}}>New Habit</Text>
                </Button>
            </View>

            {habits.map((habit) => (
                <View key={habit.id} style={[styles.habitContainer]}>
                    <View style={styles.habitHeader}>
                        <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>{habit.name}</Text>
                        <View style={styles.habitActions}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelectedHabit(habit);
                                    setEditHabitName(habit.name);
                                    setEditHabitFrequency(habit.frequency);
                                    setEditHabitColor(habit.color);
                                    setEditModalVisible(true);
                                }}
                                style={styles.editButton}
                            >
                                <AntDesign name="edit" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => toggleHabitCompletion(habit.id)}
                                style={styles.completeButton}
                            >
                                <AntDesign 
                                    name={habit.completions[getTodayIndex()] === 1 ? "checkcircle" : "checkcircleo"} 
                                    size={24} 
                                    color={habit.color} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.streakContainer}>
                        <Text style={{ color: '#fff', fontSize: 12 }}>Current Streak: {habit.streak} days</Text>
                    </View>
                    <CustomHeatMap 
                        completions={habit.completions}
                        color={habit.color}
                    />
                </View>
            ))}

            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Create New Habit</Text>
                            
                            <TextInput
                                label="Habit Name"
                                value={newHabitName}
                                onChangeText={setNewHabitName}
                                style={styles.input}
                                cursorColor='#fff'
                                textColor='#fff'
                            />
                            
                            <View style={{flexDirection: 'row', gap: 10, marginVertical: 10}}>
                                <Button 
                                    mode={newHabitFrequency === 'daily' ? 'contained' : 'outlined'}
                                    onPress={() => setNewHabitFrequency('daily')}
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        backgroundColor: newHabitFrequency === 'daily' ? '#fff' : 'transparent',
                                        padding: 0,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{color: newHabitFrequency === 'daily' ? '#000' : '#fff'}}>Daily</Text>
                                </Button>
                                <Button
                                    mode={newHabitFrequency === 'weekly' ? 'contained' : 'outlined'} 
                                    onPress={() => setNewHabitFrequency('weekly')}
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        backgroundColor: newHabitFrequency === 'weekly' ? '#fff' : 'transparent',
                                        padding: 0,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{color: newHabitFrequency === 'weekly' ? '#000' : '#fff'}}>Weekly</Text>
                                </Button>
                                <Button
                                    mode={newHabitFrequency === 'monthly' ? 'contained' : 'outlined'}
                                    onPress={() => setNewHabitFrequency('monthly')}
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        backgroundColor: newHabitFrequency === 'monthly' ? '#fff' : 'transparent',
                                        padding: 0,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{color: newHabitFrequency === 'monthly' ? '#000' : '#fff'}}>Monthly</Text>
                                </Button>
                            </View>
                            
                            <View style={styles.colorPicker}>
                                <Text style={styles.colorPickerLabel}>Choose Color:</Text>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
                                    {[
                                        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
                                        '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
                                    ].map((color) => (
                                        <TouchableOpacity
                                            key={color}
                                            onPress={() => setNewHabitColor(color)}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                backgroundColor: color,
                                                borderWidth: 2,
                                                borderColor: newHabitColor === color ? '#fff' : 'transparent'
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={styles.modalButtons}>
                                <Button style={{backgroundColor:'transparent', width:120, borderRadius:5, borderWidth:2, borderColor:'#fff'}} onPress={() => setModalVisible(false)}><Text style={{color:'#fff', fontSize:15, fontWeight:'700'}}>Cancel</Text></Button>
                                <Button style={{backgroundColor:'#fff', width:120, borderRadius:5, }} onPress={handleAddHabit}><Text style={{color:'#000', fontSize:15, fontWeight:'700'}}>Create</Text></Button>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={editModalVisible}
                    onDismiss={() => setEditModalVisible(false)}
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Habit</Text>
                            
                            <TextInput
                                label="Habit Name"
                                value={editHabitName}
                                onChangeText={setEditHabitName}
                                style={styles.input}
                                cursorColor='#fff'
                                textColor='#fff'
                            />
                            
                            <View style={{flexDirection: 'row', gap: 10, marginVertical: 10}}>
                                <Button 
                                    mode={editHabitFrequency === 'daily' ? 'contained' : 'outlined'}
                                    onPress={() => setEditHabitFrequency('daily')}
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        backgroundColor: editHabitFrequency === 'daily' ? '#fff' : 'transparent',
                                        padding: 0,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{color: editHabitFrequency === 'daily' ? '#000' : '#fff'}}>Daily</Text>
                                </Button>
                                <Button
                                    mode={editHabitFrequency === 'weekly' ? 'contained' : 'outlined'} 
                                    onPress={() => setEditHabitFrequency('weekly')}
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        backgroundColor: editHabitFrequency === 'weekly' ? '#fff' : 'transparent',
                                        padding: 0,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{color: editHabitFrequency === 'weekly' ? '#000' : '#fff'}}>Weekly</Text>
                                </Button>
                                <Button
                                    mode={editHabitFrequency === 'monthly' ? 'contained' : 'outlined'}
                                    onPress={() => setEditHabitFrequency('monthly')}
                                    style={{
                                        flex: 1,
                                        borderColor: '#fff',
                                        backgroundColor: editHabitFrequency === 'monthly' ? '#fff' : 'transparent',
                                        padding: 0,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{color: editHabitFrequency === 'monthly' ? '#000' : '#fff'}}>Monthly</Text>
                                </Button>
                            </View>
                            
                            <View style={styles.colorPicker}>
                                <Text style={styles.colorPickerLabel}>Choose Color:</Text>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
                                    {[
                                        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
                                        '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
                                    ].map((color) => (
                                        <TouchableOpacity
                                            key={color}
                                            onPress={() => setEditHabitColor(color)}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                backgroundColor: color,
                                                borderWidth: 2,
                                                borderColor: editHabitColor === color ? '#fff' : 'transparent'
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={styles.modalButtons}>
                                <Button 
                                    style={{backgroundColor:'#ff4444', width:120, borderRadius:5}} 
                                    onPress={handleDeleteHabit}
                                >
                                    <Text style={{color:'#fff', fontSize:15, fontWeight:'700'}}>Delete</Text>
                                </Button>
                                <Button 
                                    style={{backgroundColor:'#fff', width:120, borderRadius:5}} 
                                    onPress={handleEditHabit}
                                >
                                    <Text style={{color:'#000', fontSize:15, fontWeight:'700'}}>Save</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    habitContainer: {
        backgroundColor: '#121212',
        borderRadius: 25,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 15,
        paddingTop: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#121212',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        height: '45%',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    input: {
        marginBottom: 15,
        color: '#fff',
        backgroundColor: '#121212',
        borderColor: '#fff',
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    colorPicker: {
        height: 250,
        marginBottom: 15,
    },
    colorPickerLabel: {
        marginBottom: 10,
        fontSize: 16,
        color: '#fff',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    streakContainer: {
        width: '100%',
        paddingHorizontal: 7,
        marginBottom: 10,
    },
    habitHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 7,
    },
    habitActions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    editButton: {
        padding: 5,
    },
    completeButton: {
        padding: 5,
    },
});
