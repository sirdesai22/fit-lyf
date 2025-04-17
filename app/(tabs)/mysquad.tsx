import { StyleSheet, View, ScrollView, Text, ImageBackground } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import StreakCard from '@/components/StreakCard';
import { useRouter } from 'expo-router';


const users = [
  { username: 'IronLifter', profilePic: 'https://i.pinimg.com/474x/45/6f/81/456f8111faafd1895ecc23c5bc9893c8.jpg', streak: 5, rank: 'S' },
  { username: 'ZenRunner', profilePic: 'https://i.pinimg.com/474x/bf/c8/d0/bfc8d05b60bb87c8ed14c9ca446df73e.jpg', streak: 12, rank: 'E' },
  { username: 'ProteinQueen', profilePic: 'https://i.pinimg.com/736x/32/05/ac/3205acd473cefd77300e85c0d2fe8f01.jpg', streak: 9, rank: 'D' },
  { username: 'BeastMode', profilePic: 'https://i.pinimg.com/474x/09/2e/51/092e51754d2bc186fb6e1c5a33229d04.jpg', streak: 7, rank: 'A' },
  { username: 'FitVibes', profilePic: 'https://i.pinimg.com/474x/bf/1c/bb/bf1cbb9a00723bfe5e0a13ba021e8902.jpg', streak: 11, rank: 'C' },
  { username: 'SweatItOut', profilePic: 'https://i.pinimg.com/474x/6b/35/1b/6b351bd3e317c92896c9eeef119dd6e8.jpg', streak: 3, rank: 'B' },
];

export default function Feed() {
  const router = useRouter();

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

        <ScrollView contentContainerStyle={styles.container}>
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
  container: {
    paddingBottom: 50,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
