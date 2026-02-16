import {
  View,
  Text,
  ScrollView
} from "react-native"
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressStats from "@/components/ProgressStats";
import Preferences from "@/components/Preferences";
import DangerZone from "@/components/DangerZone";
import useTheme from "@/hooks/useTheme";

const SettingsScreen = () => {
  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>

        {/* Header */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.iconContainer}
            >
              <Ionicons
                name="settings"
                size={28}
                color={"#fff"}
              />
            </LinearGradient>
            <Text style={settingsStyles.title}>
              Settings
            </Text>
          </View>
        </View>

        {/* Sections */}
        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />

          <Preferences />

          <DangerZone />

        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen;