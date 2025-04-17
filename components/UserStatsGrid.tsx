import { StyleSheet, Text, View } from "react-native";

const UserStatsGrid = () => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.statsBox}>
                    <Text style={styles.statsTitle}>Rank</Text>
                    <Text style={styles.statsData}>S</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={styles.statsTitle}>Level</Text>
                    <Text style={styles.statsData}>Ninja 🥷🏻</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.statsBox}>
                    <Text style={styles.statsTitle}>Day Streak</Text>
                    <Text style={styles.statsData}>10🔥</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={styles.statsTitle}>XP</Text>
                    <Text style={styles.statsData}>975🚀</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginVertical: 10, width: '100%', display: 'flex', flexDirection: 'row', gap: 15, justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' },
    statsBox: { width: '50%', flex: 1, backgroundColor: "#151d30", padding: 16, borderRadius: 12, borderColor: '#018bf4', borderWidth: 2, shadowColor: '#fff', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10, elevation: 15 },
    statsTitle: { color: '#fff', fontSize: 14, marginBottom: 2 },
    statsData: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
});

export default UserStatsGrid;