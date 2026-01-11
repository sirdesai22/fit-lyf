import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons, Feather, Octicons } from '@expo/vector-icons';
import { Button, ProgressBar } from 'react-native-paper'; // or any other progress bar lib
import LinearGradient from 'react-native-linear-gradient';
import { ContributionGraph, LineChart, ProgressChart } from 'react-native-chart-kit';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'expo-router';
import CustomHeatMap from '@/components/CustomHeatMap';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {

  const router = useRouter();

  const [user, setUser] = useState<any | null>(null); // Type 'any' can be refined based on your needs
  const [habits, setHabits] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();

        if (authError) {
          console.error('Error getting current user:', authError);
        } else {
          setUser(currentUser);
        }
      } catch (err: any) {
        console.error('An unexpected error occurred:', err);
      } 
    };

    fetchCurrentUser();
  },[]);

  useEffect(() => {
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

    loadHabits();
  }, []);

  // Calculate total completions for each day across all habits
  const calculateTotalCompletions = () => {
    const totalCompletions = Array(31).fill(0);
    
    habits.forEach(habit => {
      habit.completions.forEach((completion: number, index: number) => {
        totalCompletions[index] += completion;
      });
    });

    // Convert to binary array (1 if any habits completed, 0 if none)
    return totalCompletions.map(count => count > 0 ? 1 : 0);
  };

  const contributionData = calculateTotalCompletions();

  const userStats = {
    name: 'John Doe',
    username: '@johndoe',
    email: 'john@example.com',
    location: 'Bengaluru, India',
    bio: 'Full Stack Dev | Productivity Nerd | Fitness Freak 🧠💪',
    avatar: 'https://i.pravatar.cc/150?img=3',
    stats: {
      habits: 8,
      streak: 23,
      points: 1250,
      level: 7,
      rank: 'Elite 🔥',
      xpProgress: 0.75, // 75% towards next level
    },
  };

  const progressData = {
    labels: ["Swim", "Bike", "Run"], // optional
    colors: ["#ff0000", "#0000ff", "#ffff00"],
    data: [0.4, 0.6, 0.8]
  };

  const chartConfig = {
    backgroundGradientFrom: "#08130D00",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const handleLogout = async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
              //call backend route to add user data
              // const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/add`, { email });
              // console.log('Login successful', data);
              router.replace('/auth/login');
          }
          else alert(error.message);
      };

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.header}>
          <Image source={{ uri: userStats.avatar }} style={styles.avatar} />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.name}>{user?.name? user.name : "Dummy"}</Text>
            <Text style={styles.username}>{user?.email}</Text>
          </View>
        </View>
      }
      headerBackgroundColor={{ dark: '#F8F8FF', light: '#F8F8FF' }}
    >

      <View style={styles.maincontainer}>
        
        <ScrollView style={styles.container}>
          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userStats.stats.habits}</Text>
              <Text style={styles.statLabel}>Habits</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userStats.stats.streak}🔥</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userStats.stats.points}</Text>
              <Text style={styles.statLabel}>XP Points</Text>
            </View>
          </View>

          <Text style={styles.aiSuggestionsTitle}>"Get more sleep, 5 more hours "</Text>

          {/* Gamified Stats */}
          <View style={styles.gamifyContainer}>
            <Text style={styles.levelText}>Level {userStats.stats.level} ⚔️</Text>
            <ProgressBar progress={userStats.stats.xpProgress} color="#0183ff" style={styles.progressBar} />
            <Text style={styles.rank}>Rank: {userStats.stats.rank}</Text>
          </View>

          <View style={styles.analyticsContainer}>
            {/* <LinearGradient colors={['#0C0C0C', '#151D30']}> */}
            <View style={[styles.analyticsBox, { borderColor: '#22c55e00', backgroundColor: '#22c55e75' }]}>
              <Text style={styles.analyticsTitle}>Progress</Text>
              <ProgressChart
                data={progressData}
                width={185}
                height={140}
                strokeWidth={10}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={true}
                style={{ padding: 0 }}
              />
            </View>
            {/* </LinearGradient> */}

            <View style={[styles.analyticsBox, { borderColor: '#0183ff00', backgroundColor: '#0183ff99' }]}>
              <Text style={styles.analyticsTitle}>Mood</Text>
              <Octicons name="smiley" size={130} color="white" />
            </View>
          </View>
          {/* </LinearGradient> */}

          <View style={[styles.graphContainer]}>
            <Text style={styles.graphTitle}>Habit Completion Summary</Text>
            <CustomHeatMap 
              completions={contributionData}
              color="#018bf4"
            />
            <View style={styles.legendContainer}>
              <Text style={styles.legendText}>No habits</Text>
              <Text style={styles.legendText}>Habits completed</Text>
            </View>
          </View>

          <View style={styles.lineChartContainer}>
            <LineChart
              data={{
                // labels: ["January", "February", "March", "April", "May", "June"],
                labels: [],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ]
                  }
                ]
              }}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              width={370} // from react-native
              height={185}
              yAxisLabel="$"
              yAxisSuffix="k"
              formatYLabel={(value) => `${value}k`}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
      </View >
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginBottom: 20 }}>
        <Button style={{backgroundColor: '#0183ff', width:'45%'}}><Text style={{color:'#fff', fontSize:20, fontWeight:700}}>Edit Profile</Text></Button>
        <Button onPress={handleLogout} style={{backgroundColor: '#f56565', width:'45%'}}><Text style={{color:'#fff', fontSize:20, fontWeight:700}}>Logout</Text></Button>
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  linearGradientBackground: {
    flex: 1, // Make it take up the entire container
    padding: 20,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#F8F8FF', //ghost white
  },
  container: {
    backgroundColor: '#0C0C0C',
    //backgroundColor: 'transparent',
    //backgroundImage: 'linear-gradient(to bottom, #0C0C0C, #151D30)', //oil black to dark blue
    flex: 1,
    //borderTopColor: '#0C0C0C',
    //borderTopWidth: 1,
    overflowY: 'hidden',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F8F8FF', //ghost white
    gap: 5,
    //borderBottomRightRadius: 20,
    //borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    //marginBottom: 25,
    //backgroundColor: '#018bf4',
    padding: 20,
    height: 200,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    color: '#0B1215',
    fontSize: 52,
    fontWeight: 900,
    textAlign: 'center',
  },
  username: {
    color: '#0B1215',
    fontWeight: 600,
    fontSize: 15,
    textAlign: 'center',
  },
  gamifyContainer: {
    //backgroundColor: '#0B1215',//obsidian
    backgroundColor: '#e6fe4e',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
  },
  levelText: {
    //color: '#00FFAA',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#0B1215',
  },
  rank: {
    color: '#000',
    marginTop: 8,
    fontWeight: '600',
  },
  aiSuggestionsTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '300',
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  analyticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsBox: {
    //backgroundColor: '#22c55e',
    borderRadius: 25,
    //padding: 5,
    width: '47%',
    height: 170,
    borderWidth: 2,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  analyticsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  graphContainer: {
    backgroundColor: '#121212',
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  graphTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  heatmap: {
    marginVertical: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
  },
  lineChartContainer: {
    // width: '47%',
    // height: 170,
    // borderWidth: 2,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
  },
  editBtn: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
  },
  logoutBtn: {
    backgroundColor: '#d33',
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfile;
