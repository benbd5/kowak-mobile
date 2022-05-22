import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { Center, Checkbox, FlatList, FormControl, Input, List, TextArea } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState, useEffect } from "react";
import { postWorkspace } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [adress, setAdress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const navigation = useNavigation()

  const [workspace, setWorkspace] = useState({
    surface: '',
    name: 'name',
    kitchen: false,
    parking: false,
    computerScreen: '',
    handicappedPersonsAccess: false,
    desk: '',
    projector: false,
    description: '',
    adress: '',
    city: '',
    zipCode: '',
    departement: '',
    region: '',
    latitude: '',
    longitude: '',
  });

  const onSubmit = () => {
    console.log("workspace", workspace);
    postWorkspace(workspace);
    navigation.navigate('Validated', 'Votre annonce a été ajoutée avec succès !')
  }

  // Api adresses
  useEffect(() => {
    const getAdress = async () => {
      var axios = require('axios');
      try {
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${adress}&type=housenumber&autocomplete=1`);
        setDisplaySuggestions(true);
        setAddressSuggestions(response.data.features);
      } catch (error) {
        console.log(error);
      }
    }
    getAdress();
  }, [adress])

  return (
    <KeyboardAwareScrollView>
      <Center style={{ backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#fff', width: '90%' }}>
          <FormControl.Label>La superficie de l'espace</FormControl.Label>
          <Input
            placeholder="Superficie en m²"
            keyboardType="numeric"
            onChangeText={value => setWorkspace({ ...workspace, surface: value })}
            value={workspace.surface}
          />

          <FormControl.Label>Quelles sont les caractéristiques de votre espace ?</FormControl.Label>
          <FormControl.Label>Cuisine</FormControl.Label>

          <Checkbox
            value={workspace.kitchen}
            onChange={() => setWorkspace({ ...workspace, kitchen: !workspace.kitchen })}
          />

          <FormControl.Label>Parking</FormControl.Label>

          <Checkbox
            onChange={() => setWorkspace({ ...workspace, parking: !workspace.parking })}
            value={workspace.parking}
          />

          <FormControl.Label>Projecteur</FormControl.Label>
          <Checkbox
            onChange={() => setWorkspace({ ...workspace, projector: !workspace.projector })}
            value={workspace.projector}
          />

          <FormControl.Label>Accès PMR</FormControl.Label>
          <Checkbox
            onChange={() => setWorkspace({ ...workspace, handicappedPersonsAccess: !workspace.handicappedPersonsAccess })}
            value={workspace.handicappedPersonsAccess}
          />

          <FormControl.Label>Nombre d'écrans</FormControl.Label>
          <Input
            keyboardType="numeric"
            onChangeText={value => setWorkspace({ ...workspace, computerScreen: value })}
            value={workspace.computerScreen}
          />

          <FormControl.Label>Nombre de bureaux</FormControl.Label>
          <Input
            keyboardType="numeric"
            onChangeText={value => setWorkspace({ ...workspace, desk: value })}
            value={workspace.desk}
          />

          <FormControl.Label>Ajouter une description à votre annonce</FormControl.Label>
          <TextArea
            placeholder="Description de l'annonce"
            onChangeText={value => setWorkspace({ ...workspace, description: value })}
            value={workspace.description}
          />

          <FormControl.Label>Adresse</FormControl.Label>
          <Input
            placeholder="Numéro et nom de rue"
            onChangeText={(text) => setAdress(text)}
            value={adress}
          />

          {displaySuggestions && (
            <FlatList
              data={addressSuggestions}
              keyExtractor={(item) => item.id}
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
                  title={item.properties.label}
                  onPress={() => {
                    setAdress(item.properties.label)
                    setWorkspace(workspace => ({
                      ...workspace,
                      adress: item.properties.label,
                      zipCode: item.properties.postcode,
                      city: item.properties.city,
                      departement: item.properties.context.split(',')[1],
                      region: item.properties.context.split(',')[2],
                      longitude: item.geometry.coordinates[0],
                      latitude: item.geometry.coordinates[1],
                    }))
                    setDisplaySuggestions(false)
                  }}
                >
                  {item.properties.label}
                </Text>
              )}
            />
          )}

          <FormControl.Label>Code postal</FormControl.Label>
          <Input
            keyboardType="numeric"
            placeholder="44000"
            onChangeText={value => setWorkspace({ ...workspace, zipCode: value })}
            value={workspace.zipCode}
          />
          <FormControl.Label>Département</FormControl.Label>
          <Input
            placeholder="Vendée"
            onChangeText={value => setWorkspace({ ...workspace, departement: value })}
            value={workspace.departement}
          />

          <FormControl.Label>Région</FormControl.Label>
          <Input
            placeholder="Pays-de-la-Loire"
            onChangeText={value => setWorkspace({ ...workspace, region: value })}
            value={workspace.region}
          />

          <FormControl.Label>Ville</FormControl.Label>
          <Input
            placeholder="La Roche-sur-Yon"
            onChangeText={value => setWorkspace({ ...workspace, city: value })}
            value={workspace.city}
            marginBottom={5}
          />

          <Button title="Ajouter" onPress={onSubmit}>
            Publier
          </Button>
        </View>
      </Center>
    </KeyboardAwareScrollView >
  );
}
