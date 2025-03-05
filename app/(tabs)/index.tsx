import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { NewsDataType } from '@/types';
import { Header, SearchBar, BreakingNews } from '@/components';

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const getBreakingNews = async() => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=us&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);

      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      };
    } catch (error: any) {
      console.log("Error Message: ", error.message);
    };
  };
  
  return (
    <View style={styles(safeTop).container}>
      <StatusBar style="dark" />
      <Header />
      <SearchBar />
      {isLoading ? (
        <ActivityIndicator size="large" style={styles(0).activityIndicator} /> 
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
    </View>
  )
};


const styles = (safeTop: number) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: safeTop,
  },
  activityIndicator: {
    height: 100,
  },
});

export default Page;