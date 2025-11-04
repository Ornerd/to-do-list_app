import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FilterTabsProps {
  currentFilter: 'all' | 'active' | 'complete';
  onFilterChange: (filter: 'all' | 'active' | 'complete') => void;
  isDarkMode: boolean;
}

export default function FilterTabs({ currentFilter, onFilterChange, isDarkMode }: FilterTabsProps) {
  const theme = {
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    activeText: isDarkMode ? '#ffffff' : '#007AFF',
    inactiveText: isDarkMode ? '#888' : '#999',
    border: isDarkMode ? '#404040' : '#e0e0e0',
  };

  const filters: { key: 'all' | 'active' | 'complete'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'complete', label: 'Complete' },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: theme.border,
        backgroundColor: theme.background,
      }}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          onPress={() => onFilterChange(filter.key)}
          style={{
            flex: 1,
            paddingVertical: 16,
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: currentFilter === filter.key ? '#007AFF' : 'transparent',
          }}
        >
          <Text
            style={{
              color: currentFilter === filter.key ? theme.activeText : theme.inactiveText,
              fontWeight: currentFilter === filter.key ? 'bold' : 'normal',
            }}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}