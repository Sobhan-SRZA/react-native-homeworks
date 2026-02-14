import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import useTheme from '@/hooks/useTheme'

const HomeScreen = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.content}>HomeScreen</Text>
      <Link href={"/settings"}>Go to settings</Link>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle to change mode</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  content: {
    fontSize: 22
  }
})

export default HomeScreen