import { View, Text, StyleSheet } from "react-native";

// Function to get today's date (0-30)
const getTodayIndex = () => {
    const today = new Date();
    return today.getDate() - 1; // Convert to 0-based index
};

export default function CustomHeatMap({ completions, color }: { completions: number[], color: string }) {
    const todayIndex = getTodayIndex();
    
    return (
        <View style={styles.heatmapContainer}>
            <View style={styles.heatmapContent}>
                <View style={styles.daysGrid}>
                    {completions.map((completed, index) => {
                        const isToday = index === todayIndex;
                        
                        return (
                            <View 
                                key={`cell-${index}`}
                                style={[
                                    styles.heatmapCell,
                                    {
                                        backgroundColor: completed === 1 ? color : 'rgba(255, 255, 255, 0.1)',
                                        borderColor: isToday ? '#fff' : 'transparent',
                                        borderWidth: isToday ? 2 : 0,
            
                                    }
                                ]}
                            >
                                <Text style={[styles.dateLabel,{
                                    color: completed === 1 ? '#000' : '#fff'
                                }]}>
                                    {index + 1}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heatmapContainer: {
        width: '100%',
        marginTop: 10,
    },
    heatmapContent: {
        width: '100%',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    heatmapCell: {
        borderRadius: 4,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
    dateLabel: {
        color: '#fff',
        fontSize: 10,
    },
});