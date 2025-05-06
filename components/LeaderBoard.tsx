import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function LeaderBoard() {
  const UserCardComponent = () => {
    return (
      <View style={styles.userCard}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Image
            source={{
              uri: "https://i.pinimg.com/474x/45/6f/81/456f8111faafd1895ecc23c5bc9893c8.jpg",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>Prathamesh Sirdesai</Text>
            <Text style={styles.stats}>S Rank - 134 days 🔥</Text>
          </View>
        </View>
        <Text style={{ fontSize: 30, color: "#fff", fontWeight: 900 }}>#1</Text>
      </View>
    );
  };
  return (
    <View style={{ height: "100%" }}>
      {/* <Text style={{ fontSize: 20, fontWeight: '500', color: '#fff', textAlign: 'center' }}>Top 5 Squad Members</Text> */}
      <ScrollView style={styles.learderboard}>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
        <UserCardComponent/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  learderboard: {
    width: "100%",
    // backgroundColor: '#242424',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    zIndex: 1,
    position: "relative",
  },
  userCard: {
    width: "100%",
    //backgroundColor: '#0183ff',
    backgroundColor: "#242424",
    marginVertical: 5,
    // borderWidth: 2,
    // borderColor: '#0183ff',
    borderRadius: 7,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    shadowColor: "#0183ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginBottom: 8,
    // borderWidth: 2,
    // borderColor: "#0183ff",
    // shadowColor: "#0183ff",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 10,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
  },
  stats: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500",
    // marginTop: 5,
  },
});
