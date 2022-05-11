import React from 'react';
import { View } from 'react-native'
import SearchBar from '../components/SearchBar';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'

function HomeScreen() {
  // On change affiche les dates en français
  dayjs.locale('fr');

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: '#fff' }}>
      <SearchBar />
      {/* <Workspaces /> */}
    </View>
  );
}

export default HomeScreen