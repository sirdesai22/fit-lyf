import { View, Text, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import CalorieProgressCard from '@/components/CalorieProgressCard';
import HabitTrackerCard from '@/components/HabitTrackerCard';
import StreakHeatmap from '@/components/StreakHeatmap';
import UserStatsGrid from '@/components/UserStatsGrid';

const mockUserData = {
    username: 'ironmonk_22',
    profilePic: 'https://i.pravatar.cc/150?img=12',
    calorieData: {
        consumed: 1350,
        target: 2000,
    },
    habits: [
        { name: 'Drink Water', status: true },
        { name: 'Workout', status: false },
        { name: 'Read 10 pages', status: true },
    ],
    streakData: [
        1, 0, 3, 4, 2, 0, 0,  // 1st week
        2, 2, 1, 3, 0, 1, 0,  // 2nd week
        4, 4, 3, 2, 1, 0, 1,  // 3rd week
        3, 2, 0, 1, 0, 1, 4   // 4th week
    ],
};

export default function UserScreen() {
    const { username } = useLocalSearchParams();

    return (
        <ImageBackground
            source={require('../../../assets/images/solo_level_bg.png')} // your image path
            style={styles.background}
            resizeMode="cover" // or 'contain', 'stretch'
        >
            <View style={{ padding: 20, paddingTop: 35, backgroundColor: '#000000e1', height: '100%' }}>
                <Link href="/mysquad" style={{ fontSize: 18, color: '#018bf4', marginBottom: 16 }}>Back</Link>
                <ScrollView contentContainerStyle={styles.container}>
                    <Image source={{ uri: mockUserData.profilePic }} style={styles.avatar} />
                    <Text style={styles.username}>{username}</Text>
                    <UserStatsGrid />
                    <CalorieProgressCard data={mockUserData.calorieData} />
                    <HabitTrackerCard habits={mockUserData.habits} />
                    {/* <StreakHeatmap streaks={mockUserData.streakData} /> */}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { width: '100%', height: '100%' },
    container: { padding: 16, alignItems: 'center' },
    avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 10, borderColor: '#018bf4', borderWidth: 2 },
    username: { fontSize: 25, fontWeight: 'bold', color: '#fff', marginBottom: 20 }
});