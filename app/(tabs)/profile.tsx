import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper'; // or any other progress bar lib

const UserProfile = () => {
  const user = {
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

  return (
    <ImageBackground
      source={require('../../assets/images/solo_level_bg.png')} // your image path
      style={styles.background}
      resizeMode="cover" // or 'contain', 'stretch'
    >

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>

        {/* Contact */}
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#aaa" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={20} color="#aaa" />
          <Text style={styles.infoText}>{user.location}</Text>
        </View>

        {/* Bio */}
        <Text style={styles.bio}>{user.bio}</Text>

        {/* Gamified Stats */}
        <View style={styles.gamifyContainer}>
          <Text style={styles.levelText}>Level {user.stats.level} ⚔️</Text>
          <ProgressBar progress={user.stats.xpProgress} color="#00FFAA" style={styles.progressBar} />
          <Text style={styles.rank}>Rank: {user.stats.rank}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.stats.habits}</Text>
            <Text style={styles.statLabel}>Habits</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.stats.streak}🔥</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.stats.points}</Text>
            <Text style={styles.statLabel}>XP Points</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: '#000000e1',
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  username: {
    color: '#aaa',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  infoText: {
    color: '#ddd',
    fontSize: 15,
    marginLeft: 8,
  },
  bio: {
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
  },
  gamifyContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  levelText: {
    color: '#00FFAA',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  rank: {
    color: '#FFD700',
    marginTop: 8,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
  },
  statBox: {
    alignItems: 'center',
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
