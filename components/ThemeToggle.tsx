import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  // Simple SVG-like icons using View components
  const SunIcon = () => (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: '#FFA500',
        }}
      />
    </View>
  );

  const MoonIcon = () => (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
      }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: '#888',
          position: 'absolute',
          top: -2,
          right: -2,
        }}
      />
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        padding: 8,
        borderRadius: 20,
        backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
      }}
    >
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </TouchableOpacity>
  );
}