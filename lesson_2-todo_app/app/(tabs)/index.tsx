import { StatusBar, Text, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import useTheme from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

const HomeScreen = () => {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />

      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle to change mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default HomeScreen