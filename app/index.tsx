import { useMutation, useQuery } from 'convex/react';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { api } from '../convex/_generated/api';

export default function HomeScreen() {
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const todos = useQuery(api.todos.getTodos) || [];
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'complete') return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo({ text: newTodoText.trim() });
      setNewTodoText('');
    }
  };

  const theme = {
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    card: isDarkMode ? '#2d2d2d' : '#f8f8f8',
    border: isDarkMode ? '#404040' : '#e0e0e0',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>T O D O</Text>
        <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
          <Image 
            source={isDarkMode 
              ? require('../assets/images/sun-icon.png')
              : require('../assets/images/moon-icon.png')
            }
            style={{ 
              width: 20, 
              height: 20,
              tintColor: theme.text // This will color your icons to match the theme
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Rest of your code remains the same */}
      {/* Add Todo Input */}
      <View style={{ padding: 16, flexDirection: 'row',  marginTop: 108, }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            padding: 12,
            marginRight: 8,
            backgroundColor: theme.card,
            color: theme.text,
          }}
          placeholder="Create a new todo..."
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 12,
            borderRadius: 8,
            justifyContent: 'center',
          }}
          onPress={handleAddTodo}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
            backgroundColor: theme.card,
          }}>
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => toggleTodo({ id: item._id, completed: !item.completed })}
              style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: item.completed ? '#007AFF' : theme.border,
                borderRadius: 4,
                marginRight: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: item.completed ? '#007AFF' : 'transparent',
              }}
            >
              {item.completed && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
            </TouchableOpacity>

            {/* Todo Text */}
            <Text style={{
              flex: 1,
              fontSize: 16,
              color: item.completed ? '#888' : theme.text,
              textDecorationLine: item.completed ? 'line-through' : 'none',
            }}>
              {item.text}
            </Text>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => deleteTodo({ id: item._id })}
              style={{ padding: 8 }}
            >
              <Text style={{ color: '#494C6B', fontSize: 24 }}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ flex: 1, padding: 16, borderRadius: 16, overflowX: 'hidden' }}
      />

      {/* Filter Tabs */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: theme.border }}>
        {['all', 'active', 'complete'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            onPress={() => setFilter(filterType)}
            style={{
              flex: 1,
              padding: 16,
              alignItems: 'center',
              borderBottomWidth: 3,
              borderBottomColor: filter === filterType ? 'transparent' : 'transparent',
            }}
          >
            <Text style={{
              color: filter === filterType ? '#007AFF' : (isDarkMode ? '#888' : '#999'),
              fontWeight: filter === filterType ? 'bold' : 'normal',
            }}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}