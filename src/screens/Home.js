import React from 'react';
import { View } from 'react-native'
import SearchBar from '../components/SearchBar';

function HomeScreen() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <SearchBar />
    </View>
  );
}

export default HomeScreen