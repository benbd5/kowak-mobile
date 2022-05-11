import { Text } from "native-base";
import React from "react";
import { TouchableOpacity } from 'react-native';

/**
 * 
 * @param {String} text Text du boutton à afficher 
 * @param {Function} text Fonction à exécuter lors du clic sur le boutton 
 * @returns 
 */
export default function Button({ text, validate }) {
  console.log("validate", validate);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={validate}
      style={{
        backgroundColor: '#fef08a',
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        borderRadius: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        fontWeight={'bold'}
        fontSize={20}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
