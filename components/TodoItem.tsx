import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TodoItemProps {
  todo: {
    _id: string;
    text: string;
    completed: boolean;
  };
  onToggle: () => void;
  onDelete: () => void;
  isDarkMode: boolean;
}

export default function TodoItem({ todo, onToggle, onDelete, isDarkMode }: TodoItemProps) {
  const theme = {
    text: isDarkMode ? '#ffffff' : '#000000',
    card: isDarkMode ? '#2d2d2d' : '#f8f8f8',
    border: isDarkMode ? '#404040' : '#e0e0e0',
    completedText: isDarkMode ? '#888' : '#999',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.card,
      }}
    >
      {/* Checkbox */}
      <TouchableOpacity
        onPress={onToggle}
        style={{
          width: 20,
          height: 20,
          borderWidth: 2,
          borderColor: todo.completed ? '#007AFF' : theme.border,
          borderRadius: 4,
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: todo.completed ? '#007AFF' : 'transparent',
        }}
      >
        {todo.completed && (
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
        )}
      </TouchableOpacity>

      {/* Todo Text */}
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          color: todo.completed ? theme.completedText : theme.text,
          textDecorationLine: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.text}
      </Text>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={onDelete}
        style={{
          padding: 8,
          marginLeft: 8,
        }}
      >
        <Text style={{ color: '#FF3B30', fontSize: 18, fontWeight: 'bold' }}>×</Text>
      </TouchableOpacity>
    </View>
  );
}