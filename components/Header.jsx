import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Header = (props) => {
  return (
    <View style={styles.container}>

      {/* AVATAR */}
      <Image
        source={{ uri: "https://avatar.iran.liara.run/public/34" }}
        style={styles.userImage}
      />

      {/* USERNAME / WELCOME TEXT */}
      <View style={styles.userInfoTextWrapper}>
        <Text style={styles.welcomeText}>
          Welcome
        </Text>
        <Text style={styles.userNameText}>
          Sid Gautama
        </Text>
      </View>

      {/* NOTIFICATION ICON */}
      <TouchableOpacity onPress={() => {}}>
        <Ionicons
          name="notifications-outline"
          size={28}
          color={Colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userImage: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.black,
  },
  userInfoTextWrapper: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "flex-start",
  },
  welcomeText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userNameText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
  },
});

export default Header