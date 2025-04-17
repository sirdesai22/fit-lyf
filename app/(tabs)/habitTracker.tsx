// App.js or your screen component
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import HabitCard from '../../components/HabitCard';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

export default function App() {
    return (
        <ImageBackground
            source={require('../../assets/images/solo_level_bg.png')} // your image path
            style={styles.background}
            resizeMode="cover" // or 'contain', 'stretch'
        >
            <ThemedView style={{ height: '100%', padding: 20 }}>
                <View style={{ width: '100%', height: 50, marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>FitLyf</Text>
                </View>

                <ScrollView style={{ padding: 20 }}>
                    <HabitCard
                        title="Cardio"
                        icon={<FontAwesome5 name="walking" size={18} color="#FF6B6B" />}
                        color="#FF6B6B"
                        progress={35}
                    />
                    <HabitCard
                        title="Workout 💪"
                        icon={<FontAwesome5 name="dumbbell" size={18} color="#4DB6FF" />}
                        color="#4DB6FF"
                        progress={20}
                    />
                    <HabitCard
                        title="Book Reading 📖"
                        icon={<MaterialCommunityIcons name="book-open-page-variant" size={18} color="#FFA500" />}
                        color="#FFA500"
                        progress={30}
                    />
                    <HabitCard
                        title="DSA 🎯"
                        icon={<MaterialCommunityIcons name="code-tags" size={18} color="#4CAF50" />}
                        color="#4CAF50"
                        progress={25}
                    />
                </ScrollView>
            </ThemedView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});