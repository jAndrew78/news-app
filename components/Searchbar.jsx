import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const Searchbar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={Colors.medGrey} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={Colors.medGrey}
        autoCapitalize="none"
        style={styles.searchText}
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
  flexDirection: "row",
  gap: 10,
  padding: 12,
  marginHorizontal: 20,
  borderRadius: 10,
  backgroundColor: Colors.lightGrey,
 },
 searchText: {
  flex: 1,
  fontSize: 16,
  fontWeight: "700",
  color: Colors.darkGrey, 
 },
})

export default Searchbar