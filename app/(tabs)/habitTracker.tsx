// App.js or your screen component
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import HabitCard from '../../components/HabitCard';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import HeatMap from '@ncuhomeclub/react-native-heatmap';
import type { ColorProps } from '@ncuhomeclub/react-native-heatmap';

const color: ColorProps = {
    theme: '#FF6B6B',
    opacitys: [
        {
            opacity: 0.2,
            limit: 5,
        },
        {
            opacity: 0.4,
            limit: 10,
        },
        {
            opacity: 0.6,
            limit: 15,
        },
        {
            opacity: 0.8,
            limit: 20,
        },
        {
            opacity: 1,
            limit: 25,
        },
    ],
}

export default function App() {
    const data = [
        12, 423, 42, 12, 0, 0, 0, 23, 0, 0, 0, 0, 0, 34, 35, 34, 23, 23, 35, 34, 10,
        2, 4, 6, 2, 5, 0, 0,
    ];
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

                <ScrollView style={{ padding: 10 }}>
                    <View style={{ backgroundColor: '#000', padding: 5, borderRadius: 10, borderColor: '#FF6B6B', borderWidth: 2 }}>
                        <HeatMap data={data} color={color} xNumber={52} yNumber={7} shape='circle' />
                    </View>

                    {/* <HabitCard
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
                    /> */}

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