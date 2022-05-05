import { FlatList } from "native-base";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { getAllWorkspaces } from "../services/api";
import Workspaces from "./Workspaces";

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
    <View style={{ width: '100%' }}>
      <TextInput
        style={{ height: 40, borderWidth: 1 }}
        onChangeText={onChangeSearch}
        value={searchQuery}
        placeholder="Search"
        autoFocus={false}
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

      {/* Affiche la liste des espaces de travail */}
      <Workspaces cities={citiesSuggestions} />

    </View>
  );
}
