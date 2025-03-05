import { StyleSheet, Text, View } from 'react-native';
import { NewsDataType } from '@/types';
import Anitmated, { SharedValue } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';

type Props = {
  items: NewsDataType[],
  paginationIndex: number,
  scrollX: SharedValue<number>,
};

const Pagination = ({items, paginationIndex, scrollX}: Props) => {

  return (
    <View style={styles(0, 0).container}>
      {items.map((_, index) => {
        return (
          <Anitmated.View style={styles(paginationIndex, index).dot} key={index} />
        );
      })}
    </View>
  )
}

const styles = (paginationIndex: number, index: number) => StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: paginationIndex === index ? Colors.medGrey : Colors.black,
  },
});

export default Pagination;