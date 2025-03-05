import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { NewsDataType } from "../types";
import { Colors } from '@/constants/Colors';
import SliderItem from "@/components/SliderItem";
import Pagination from '@/components/Pagination';


type Props = {
  newsList: Array<NewsDataType>,
};

const BreakingNews = ({newsList}: Props) => {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 10000);
    } else {
      clearInterval(interval.current);
    };
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (viewableItems[0].index) {
      setPaginationIndex(viewableItems[0].index % newsList.length);
    };
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);
  
  const renderItem = (item: NewsDataType, index: number) => {
    return (
      <SliderItem slideItem={item} index={index} scrollX={scrollX}/>
    );
  };

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>

      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data} 
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({item, index}) => renderItem(item, index)}
          showsHorizontalScrollIndicator={false} 
          onScroll={onScrollHandler}
          onScrollBeginDrag={() => setIsAutoPlay(false)}
          onScrollEndDrag={() => setIsAutoPlay(true)}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
        <Pagination items={newsList} paginationIndex={paginationIndex} scrollX={scrollX} /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    justifyContent: "center",
  },

});

export default BreakingNews