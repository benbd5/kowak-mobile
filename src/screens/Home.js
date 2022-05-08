import React from 'react';
import { View } from 'react-native'
import SearchBar from '../components/SearchBar';
import Workspaces from '../components/Workspaces';

function HomeScreen() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: '#fff' }}>
      <SearchBar />
      {/* <Workspaces /> */}
    </View>
  );
}

export default HomeScreen