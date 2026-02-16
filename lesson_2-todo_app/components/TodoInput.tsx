import {
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from 'convex/react';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme'

const TodoInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodos);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                await addTodo({ text: newTodo.trim() })
                setNewTodo("")
            }

            catch (err) {
                console.log("Error adding a todo", err)
                Alert.alert("Error", "Failed to add todo")
            }
        }
    }

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder='What needs to be done?'
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={handleAddTodo}
                    multiline
                    placeholderTextColor={colors.textMuted}
                />

                <TouchableOpacity
                    onPress={handleAddTodo}
                    activeOpacity={0.8}
                    disabled={!newTodo.trim()}
                >
                    <LinearGradient
                        colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
                    >
                        <Ionicons name='add' size={24} color={"#ffffff"} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput