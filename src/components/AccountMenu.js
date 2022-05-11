import React from 'react';
import { Divider, Text, View, VStack } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

/**
 * 
 * @param {String} iconName nom de l'icone 
 * @param {String} text text à afficher
 * @param {String} nav text contenant le nom de la page à afficher
 * @param {Props} profile informations du profile 
 * @returns 
 */
export default function AccountMenu({ iconName, text, nav, profile }) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate(nav, profile)}>
        <VStack direction='row' justifyContent='space-between'>
          <MaterialCommunityIcons name={iconName} size={20} />
          <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {text}
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={20} />
        </VStack>
      </TouchableOpacity>
      <Divider my="0.5" color='blue.900' />
    </View>
  );
}