import React from 'react';
import { AlertDialog, Button, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DeleteAlertButton({ text, validate, width, marginBottom, marginLeft, marginRight, marginTop, textHeader }) {
  console.log("validate", validate);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = React.useState(false);

  const onClose = () => setAlertDialogIsOpen(false);
  const cancelRef = React.useRef(null);

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setAlertDialogIsOpen(true)}
        style={{
          backgroundColor: '#BE4242',
          borderColor: '#000',
          borderWidth: 1,
          marginTop: 10,
          marginLeft: marginLeft,
          marginBottom: marginBottom,
          marginRight: marginRight,
          padding: 10,
          borderRadius: 0,
          width: width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          fontWeight={'bold'}
          fontSize={20}>
          {text}
        </Text>
      </TouchableOpacity>

      <AlertDialog leastDestructiveRef={cancelRef} isOpen={alertDialogIsOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{textHeader}</AlertDialog.Header>
          <AlertDialog.Body>
            Voulez-vous vraiment continuer ?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Annuler
              </Button>
              <Button colorScheme="danger" onPress={validate}>
                Valider
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  );
}