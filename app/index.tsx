import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";


const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text
            style={styles.titleText}
            entering={FadeIn.delay(400).duration(1000)}
          >
            The Daily Zen
          </Animated.Text>
          {/* <Text style={styles.wrapperText}>
            Welcome Page
          </Text> */}
          {/* <TouchableOpacity onPress={() => router.replace("/(tabs)")}> */}
          <Animated.View entering={FadeInDown.delay(1800).duration(1000)}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace("/(tabs)")}
              >
              <Animated.Text style={styles.buttonText}>
                Oom
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.Text
            style={styles.descrip}
            entering={FadeIn.delay(1600).duration(1000)}
          >
            Personalized updates for your mind
          </Animated.Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 30,
    // backgroundColor: "#00000050",
  },
  titleText: {
    flex: 1,
    marginTop: 100,
    fontSize: 24,
    fontWeight: "600",
    color: Colors.white,
  },
  descrip: {
    fontSize: 14,
    // lineHeight: 22,
    // letterSpacing: 1.2,
    color: Colors.white,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 140,
    borderRadius: 10,
    backgroundColor: Colors.opaqueGrey,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.lightGrey,
  },
});
