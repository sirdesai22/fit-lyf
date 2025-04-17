import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const StreakCard = ({ username, profilePic, streak, rank, onPress }: {
  username: string;
  profilePic: string;
  streak: number;
  rank: string;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* <View style={styles.fireBadge}>
        <Text style={styles.rankText}>S</Text>
        <Text style={styles.fireText}>🔥 {streak}</Text>
        </View> */}
      <Image source={{ uri: profilePic }} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
      <View style={styles.statBadge}>
        <Text style={styles.rankText}>{rank} rank</Text>
        <Text style={styles.fireText}>{streak}🔥</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    aspectRatio: 1,
    // backgroundColor: '#111',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    // marginHorizontal: '1.5%',
    // shadowColor: '#018bf4',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.7,
    // shadowRadius: 8,
    // elevation: 10,
    position: 'relative'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#018bf4',
    shadowColor: '#018bf4',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 10,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  fireBadge: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // right: '50%',
    zIndex: 1000,
    // backgroundColor: '#111',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 12,
    // shadowColor: '#018bf4',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 10,
  },
  statBadge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  rankText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    // fontSize: 50,
    // position: 'absolute',
    // top: -10,
    // left: 20,
    // zIndex: 1000,
  },
  fireText: {
    color: '#ff9900',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default StreakCard;
