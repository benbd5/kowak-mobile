import { FlatList, Icon, Input } from "native-base";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAllWorkspaces } from "../services/api";
import Workspaces from "./Workspaces";
import EvilIcons from 'react-native-vector-icons/EvilIcons'

// Barre de recherche pour trouver les villes où des espaces de travail sont disponibles
// Recherche par nom de ville dynamique (à partir de la base de données)
export default function SearchBar() {
  const [displaySuggestions, setDisplaySuggestions] = useState(false)
  const [citiesSuggestions, setCitiesSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction appellée lorsque l'utilisateur entre un caractère dans le champ de recherche
  const onChangeSearch = query => setSearchQuery(query);

  const searchCity = (query, list) => {
    setDisplaySuggestions(true);
    return list.filter(item => {
      return item.city.toLowerCase().includes(query.toLowerCase());
    });
  }

  const getData = async () => {
    const workspaces = await getAllWorkspaces()
    setCitiesSuggestions(searchCity(searchQuery, workspaces));
  }

  // On récupère les données lorsque l'utilisateur entre une valeur dans le champ de recherche
  useEffect(async () => {
    await getData()
  }, [searchQuery])

  return (
    <View style={{ width: '90%', marginTop: 40 }}>
      <View>
        <Input
          style={{ padding: 10 }}
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholder="Où travailler ?"
          autoFocus={false}
          variant="underlined"
          borderBottomColor={'#2563eb'}
          InputLeftElement={<Icon m="2" ml="3" size="6" color="#2563eb" as={<EvilIcons name="search" />} />}
        />
        {searchQuery.length > 0 && displaySuggestions && (
          <FlatList
            data={citiesSuggestions}
            keyExtractor={(item) => item.workSpaceId}
            renderItem={({ item }) => (
              <Text
                style={{
                  padding: 10,
                  fontSize: 12,
                  height: 44,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  backgroundColor: '#fff',
                  color: '#000',
                }}
                title={item.city}
                onPress={() => {
                  setSearchQuery(item.city)
                  setDisplaySuggestions(false)
                }
                }
              >
                {item.city}
              </Text>
            )}
          />
        )}
      </View>

      {/* Affiche la liste des espaces de travail */}
      <Workspaces cities={citiesSuggestions} />

    </View>
  );
}
