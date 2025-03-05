import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors';

type Props = {
  slideItem: NewsDataType,
  index: number,
  scrollX: SharedValue<number>,
};

const {width} = Dimensions.get("screen");

const SliderItem = ({slideItem, index, scrollX}: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.135, 0, width * 0.135],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.95, 1, 0.95],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, rnStyle]}>
      <Image source={{uri: slideItem.image_url}} style={styles.image} />
      <LinearGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]} style={styles.bg}>

        <View style={styles.sourceInfo}>
          {slideItem.source_icon && (
            <Image source={{uri: slideItem.source_icon}} style={styles.sourceIcon} />
          )}
          <Text style={styles.sourceName}>{slideItem.source_name}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>

      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 180,
    width: width*0.85,
    borderRadius: 20,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: width*0.075,
    right: 0,
    height: 180,
    width: width*0.85,
    padding: 20,
    borderRadius: 20,
  },
  sourceInfo: {
    position: "absolute",
    top: 85,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 5,
  },
  sourceIcon: {
    height: 25,
    width: 25,
    borderRadius: 99,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: "700",
    color: Colors.white,
  },
});

export default SliderItem;