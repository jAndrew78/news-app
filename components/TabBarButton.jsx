import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { icon } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, label }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 0 : 0) : isFocused,
      { duration: 50 }
    );
  }, [opacity, isFocused]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {icon[routeName]({
        color: isFocused ? Colors.darkGrey : Colors.tabIconDefault,
        focused: isFocused,
      })}
      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.white : Colors.darkGrey,
            fontSize: 12,
            fontWeight: isFocused ? "800" : "500",
          },
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabBarButton;