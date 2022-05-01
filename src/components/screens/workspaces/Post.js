import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, FlatList, FormControl, Input, List, TextArea } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useState, useEffect } from "react";
import { postWorkspace } from "../../../services/api";

export default function App() {
  const [parkingChecked, setParkingChecked] = useState(false);
  const [adress, setAdress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const [workspace, setWorkspace] = useState({
    surface: '',
    name: 'name',
    kitchen: 0,
    parking: 1,
    computerScreen: '',
    handicappedPersonsAccess: 0,
    desk: '',
    projector: '',
    description: '',
    adress: '',
    city: '',
    zipCode: '',
    departement: '',
    region: '',
    latitude: '',
    longitude: '',
  });

  const toggleParkingChecked = () => {
    console.log("toggleParkingChecked before", parkingChecked);
    setParkingChecked(!parkingChecked);
    console.log("toggleParkingChecked after", parkingChecked);
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      surface: workspace.surface,
      name: workspace.name,
      kitchen: workspace.kitchen,
      parking: workspace.parking,
      computerScreen: workspace.computerScreen,
      handicappedPersonsAccess: workspace.handicappedPersonsAccess,
      desk: workspace.desk,
      projector: workspace.projector,
      description: workspace.description,
      adress: workspace.adress,
      city: workspace.city,
      zipCode: workspace.zipCode,
      departement: workspace.departement,
      region: workspace.region,
      latitude: workspace.latitude,
      longitude: workspace.longitude,
    }
  });

  console.log("workspace", workspace);

  const onSubmit = (data) => {
    console.log('data', data);
    postWorkspace(data)
  }

  // Api adresses
  useEffect(() => {
    const getAdress = async () => {
      var axios = require('axios');
      axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${adress}&type=housenumber&autocomplete=1`)
        .then(function (response) {
          console.log('response api adresse', response.data);
          setDisplaySuggestions(true);
          setAddressSuggestions(response.data.features);
          console.log('addressSuggestions', addressSuggestions);
        })
        .catch(function (error) {
          console.log('error api adresse', error);
        });
    }
    getAdress();
  }, [adress])




  return (
    <KeyboardAwareScrollView>
      <View>
        <FormControl.Label>Surface</FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              // style={styles.input}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="surface"
        />
        {errors.firstName && <Text>This is required.</Text>}

        <FormControl.Label>Quelles sont les caractéristiques de votre espace ?</FormControl.Label>
        <FormControl.Label>Cuisine</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              // style={styles.input}
              onValueChange={toggleParkingChecked}
              // value={parkingChecked}
              isPressed={toggleParkingChecked}
              value={value}
              // isPressed={value ? true : false}
              onBlur={onBlur}
            // onChangeText={onChange}
            // value={value}
            />
          )}
          name="kitchen"
        />

        <FormControl.Label>Parking</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              // style={styles.input}
              // isPressed={!value}
              // onChange={value ? true : false}
              onValueChange={toggleParkingChecked}
              onBlur={onBlur}
              value={parkingChecked}
            />
          )}
          name="parking"
        />

        <FormControl.Label>Projecteur</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              // style={styles.input}
              isPressed={value ? true : false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="projector"
        />

        <FormControl.Label>Accès PMR</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              // style={styles.input}
              // render boolean value of the checkbox
              isPressed={value ? true : false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="handicappedPersonsAccess"
        />

        <FormControl.Label>Nombre d'écrans</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              // style={styles.input}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="computerScreen"
        />

        <FormControl.Label>Nombre de bureaux</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              // style={styles.input}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="desk"
        />

        <FormControl.Label>Ajouter une description à votre annonce</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextArea
              placeholder="Description de l'annonce"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="description"
        />

        <FormControl.Label>Adresse</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Numéro et nom de rue"
              onBlur={onBlur}
              onChangeText={(text) => setAdress(text)}
              value={adress}
            />
          )}
          name="adress"
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
                    // ...workspace,
                    adress: item.properties.label,
                    zipCode: item.properties.postcode,
                    city: item.properties.city,
                    departement: item.properties.context.split(',')[1],
                    region: item.properties.context.split(',')[2],
                    latitude: item.geometry.coordinates[0],
                    longitude: item.geometry.coordinates[1],
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
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="numeric"
              placeholder="44000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            // value={workspace.zipCode}
            />
          )}
          name="zipCode"
        />

        <FormControl.Label>Département</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Vendée"
              onBlur={onBlur}
              onChangeText={onChange}
              // value={workspace.departement}
              value={value}
            />
          )}
          name="departement"
        />

        <FormControl.Label>Région</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Vendée"
              onBlur={onBlur}
              onChangeText={onChange}
              // value={workspace.region}
              value={value}
            />
          )}
          name="region"
        />

        <FormControl.Label>Ville</FormControl.Label>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="44000"
              onBlur={onBlur}
              onChangeText={onChange}
              // value={workspace.city}
              value={value}
            />
          )}
          name="city"
        />

        <Button title="Ajouter" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAwareScrollView >
  );
}
