import {
    View,
    Text,
    Switch
} from "react-native"
import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";

const Preferences = () => {
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotificaitionEnabled, setIsNotificaitionEnabled] = useState(true);

    const { colors, isDarkMode, toggleDarkMode } = useTheme();

    const settingsStyles = createSettingsStyles(colors);

    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
            <Text style={settingsStyles.sectionTitle}>
                Preferences
            </Text>

            {/* Theme toggle */}
            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.primary}
                        style={settingsStyles.settingIcon}
                    >
                        <Ionicons
                            name="moon"
                            size={18}
                            color={"#fff"}
                        />
                    </LinearGradient>

                    <Text style={settingsStyles.settingText}>
                        Dark Mode
                    </Text>
                </View>

                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={"#fff"}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    ios_backgroundColor={colors.border}
                />
            </View>

            {/* Notification */}
            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.warning}
                        style={settingsStyles.settingIcon}
                    >
                        <Ionicons
                            name="notifications"
                            size={18}
                            color={"#fff"}
                        />
                    </LinearGradient>

                    <Text style={settingsStyles.settingText}>
                        Notification
                    </Text>
                </View>

                <Switch
                    value={isNotificaitionEnabled}
                    onValueChange={() => setIsNotificaitionEnabled(!isNotificaitionEnabled)}
                    thumbColor={"#fff"}
                    trackColor={{ false: colors.border, true: colors.warning }}
                    ios_backgroundColor={colors.border}
                />
            </View>

            {/* Auto sync */}
            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient
                        colors={colors.gradients.success}
                        style={settingsStyles.settingIcon}
                    >
                        <Ionicons
                            name="sync"
                            size={18}
                            color={"#fff"}
                        />
                    </LinearGradient>

                    <Text style={settingsStyles.settingText}>
                        Auto Sync
                    </Text>
                </View>

                <Switch
                    value={isAutoSync}
                    onValueChange={() => setIsAutoSync(!isAutoSync)}
                    thumbColor={"#fff"}
                    trackColor={{ false: colors.border, true: colors.success }}
                    ios_backgroundColor={colors.border}
                />
            </View>
        </LinearGradient>
    )
}

export default Preferences