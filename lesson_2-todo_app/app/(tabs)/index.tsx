import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import {
  useMutation,
  useQuery
} from "convex/react";
import {
  Doc,
  Id
} from "@/convex/_generated/dataModel";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import TodoInput from "@/components/TodoInput";
import useTheme from "@/hooks/useTheme"
import Header from "@/components/Header";

type Todo = Doc<"todos">

const HomeScreen = () => {
  // Todo editing states
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null)
  const [editText, setEditText] = useState("")

  // Theme section
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  // Todos database section
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodos);
  const deleteTodo = useMutation(api.todos.deleteTodos);
  const updateTodo = useMutation(api.todos.updateTodos);

  // Loading section
  const isLoading = todos === undefined;

  if (isLoading)
    return <LoadingSpinner />


  // Buttons action section
  // toggle
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id })
    }

    catch (err) {
      console.log("Error toggling todo", err)
      Alert.alert("Error", "Failed to toggle todo")
    }
  }

  // delete
  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      Alert.alert(
        "Delete Todo",
        "Are you sure you want to delete this todo?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await deleteTodo({ id })
            }
          }
        ]
      )
    }

    catch (err) {
      console.log("Error deleting todo", err)
      Alert.alert("Error", "Failed to delete todo")
    }
  }

  // edit


  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text)
    setEditingId(todo._id)
  }

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() })
        setEditText("")
        setEditingId(null)
      }

      catch (err) {
        console.log("Error saving todo", err)
        Alert.alert("Error", "Failed to save todo")
      }
    }
  }

  const handleCancelEdit = () => {
    setEditText("")
    setEditingId(null)
  }


  // Todos list item render section
  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >

          {/* Toggle btn */}
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border
                }
              ]}
            >
              {item.isCompleted && <Ionicons name="checkmark" size={18} color={"#fff"} />}
            </LinearGradient>
          </TouchableOpacity>

          {/* Todo content section */}
          {
            isEditing
              ? (
                <View style={homeStyles.editContainer}>
                  {/* Edit input */}
                  <TextInput
                    style={homeStyles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                    autoFocus
                    multiline
                    placeholder="Edit your todo..."
                    placeholderTextColor={colors.textMuted}
                  />

                  {/* Buttons */}
                  <View style={homeStyles.editButtons}>

                    {/* Save btn */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleSaveEdit}
                    >
                      <LinearGradient
                        colors={colors.gradients.success}
                        style={homeStyles.editButton}
                      >
                        <Ionicons name="checkmark" size={16} color={"#fff"} />
                        <Text style={homeStyles.editButtonText}>
                          Save
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Cancel btn */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleCancelEdit}
                    >
                      <LinearGradient
                        colors={colors.gradients.muted}
                        style={homeStyles.editButton}
                      >
                        <Ionicons name="close" size={16} color={"#fff"} />
                        <Text style={homeStyles.editButtonText}>
                          Cancel
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              )
              : (
                <View style={homeStyles.todoTextContainer}>

                  {/* Todo text */}
                  <Text style={[
                    homeStyles.todoText,
                    item.isCompleted && {
                      textDecorationLine: "line-through",
                      color: colors.textMuted,
                      opacity: 0.6
                    }
                  ]}>
                    {item.text}
                  </Text>

                  <View style={homeStyles.todoActions}>
                    {/* Edit Btn */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleEditTodo(item)}
                    >
                      <LinearGradient
                        colors={colors.gradients.warning}
                        style={homeStyles.actionButton}
                      >
                        <Ionicons name="pencil" size={14} color={"#fff"} />
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Delete Btn */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleDeleteTodo(item._id)}
                    >
                      <LinearGradient
                        colors={colors.gradients.danger}
                        style={homeStyles.actionButton}
                      >
                        <Ionicons name="trash" size={14} color={"#fff"} />
                      </LinearGradient>
                    </TouchableOpacity>

                  </View>
                </View>
              )
          }
        </LinearGradient >
      </View >
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />

      <SafeAreaView style={homeStyles.safeArea}>
        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    </LinearGradient>
  )
}

export default HomeScreen;