import { useNavigation } from "@react-navigation/native";
import { Text, View, VStack } from "native-base";
import React from "react";
import Button from "../components/Button";
import Fontisto from "react-native-vector-icons/Fontisto";

export default function Validated() {

  const navigation = useNavigation();

  const validate = () => {
    navigation.navigate('Workspaces');
  }

  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
      }}>

      <Text marginBottom={50}>
        Kowak
      </Text>

      {/* Design a circle with a check inside */}
      <View style={{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
      }}>
        <VStack
          justifyContent={'center'}
          alignItems={'center'}>
          <Fontisto name="check" size={40} color="#2563eb" />
        </VStack>
      </View>



      <Text fontWeight={'bold'} textAlign={'center'}>
        Votre demande de réservation a été envoyé avec succès !
      </Text>
      <Button text={'RETOUR'} validate={validate} />
    </View>
  );
}