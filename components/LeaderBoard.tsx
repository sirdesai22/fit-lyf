import { View, Text, StyleSheet } from "react-native";

export default function LeaderBoard() {
    return (
        <View style={{ height: '100%' }}>
            {/* <Text style={{ fontSize: 20, fontWeight: '500', color: '#fff', textAlign: 'center' }}>Top 5 Squad Members</Text> */}
            <View style={styles.learderboard}>
                <View style={styles.userCard}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>1. John Doe</Text>
                </View>
                <View style={styles.userCard}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>1. John Doe</Text>
                </View>
                <View style={styles.userCard}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>1. John Doe</Text>
                </View>
                <View style={styles.userCard}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>1. John Doe</Text>
                </View>
                <View style={styles.userCard}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center' }}>1. John Doe</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    learderboard:{
        width: '100%',
        backgroundColor: '#242424',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1,
        position: 'relative',
    },
    userCard: {
        width: '100%',
        //backgroundColor: '#0183ff',
        backgroundColor: '#242424',
        borderWidth: 2,
        borderColor: '#0183ff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0183ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})