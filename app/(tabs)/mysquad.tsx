import { StyleSheet, View, ScrollView, Text, ImageBackground } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import StreakCard from '@/components/StreakCard';
import { useRouter } from 'expo-router';
import LeaderBoard from '@/components/LeaderBoard';
import ParallaxScrollView from '@/components/ParallaxScrollView';


const users = [
  { username: 'IronLifter', profilePic: 'https://i.pinimg.com/474x/45/6f/81/456f8111faafd1895ecc23c5bc9893c8.jpg', streak: 5, rank: 'S' },
  { username: 'ZenRunner', profilePic: 'https://i.pinimg.com/474x/bf/c8/d0/bfc8d05b60bb87c8ed14c9ca446df73e.jpg', streak: 12, rank: 'A' },
  { username: 'ProteinQueen', profilePic: 'https://i.pinimg.com/736x/32/05/ac/3205acd473cefd77300e85c0d2fe8f01.jpg', streak: 9, rank: 'B' },
];

export default function Feed() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: '500', color: '#000', textAlign: 'center', marginVertical: 17 }}>Top 3 Squad Members</Text>
          <View style={styles.grid}>
            {users.map((user, index) => (
              <StreakCard
                key={index}
                username={user.username}
                profilePic={user.profilePic}
                streak={user.streak}
                rank={user.rank}
                onPress={() => {
                  router.push({
                    pathname: '/user/[username]', // dynamic file path
                    params: { username: user.username }, // key must match [username]
                  });
                }}
              />
            ))}
          </View>
        </View>
      }
      headerBackgroundColor={{ dark: '#F8F8FF', light: '#F8F8FF' }}
    >
      <View style={styles.container}>
        <LeaderBoard />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  learderboard: {
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
});
