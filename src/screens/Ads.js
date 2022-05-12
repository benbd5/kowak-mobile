import React, { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { deleteWorkspace, userProfile } from '../services/api';
import { Center, HStack, ScrollView, Text, View, AlertDialog, Button } from 'native-base';
import Loading from '../components/Loading';
import BoxWorkspace from '../components/BoxWorkspace';
import { TouchableOpacity } from 'react-native';
import DeleteAlertButton from '../components/DeleteAlertButton';

/**
 * Les annonces que l'utilisateur a créé
 * @returns 
 */
export default function Ads() {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);

  const onClose = () => setAlertDialogIsOpen(false);
  const cancelRef = React.useRef(null);

  const navigation = useNavigation();

  const getData = async () => {
    const response = await userProfile()
    await setProfile(response);
    await setLoading(false);
  }

  // Permet de récupérer les données de l'utilisateur connecté à chaque fois que l'on se rend sur la page Account
  // useFocusEffect(
  React.useCallback(() => {
    const fetchUser = async () => {
      try {
        await getData()
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchUser()
  }, [])
  // )

  useEffect(async () => {
    await getData();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  const validate = (workspace) => {
    console.log("workspace", workspace);
    navigation.navigate('Modification de l\'annonce', { workspace });
  }

  const deleteThisWorkspace = async (workspace) => {
    console.log("workspace", workspace);
    await deleteWorkspace(workspace);
    navigation.navigate('Validated', 'Votre annonce a bien été supprimée !');
  }

  return (
    <Center
      style={{
        backgroundColor: '#fff',
        height: '100%',
      }}>
      <ScrollView>
        {
          profile.item.work_space_appartenir.length > 0 ? profile.item.work_space_appartenir.map(workSpace => {
            return (
              <View>
                <BoxWorkspace key={workSpace.workspaceId} workspace={workSpace} favorites={workSpace} />

                <HStack
                  justifyContent={'center'}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => validate(workSpace)}
                    style={{
                      backgroundColor: '#fef08a',
                      borderColor: '#000',
                      borderWidth: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      padding: 10,
                      borderRadius: 0,
                      width: '40%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      fontWeight={'bold'}
                      fontSize={20}>
                      MODIFIER
                    </Text>
                  </TouchableOpacity>

                  <DeleteAlertButton
                    workspace={workSpace}
                    marginLeft={10}
                    marginRight={10}
                    marginBottom={10}
                    text='SUPPRIMER'
                    width='100%'
                    validate={() => setAlertDialogIsOpen(true)} />
                </HStack>

                <AlertDialog leastDestructiveRef={cancelRef} isOpen={alertDialogIsOpen} onClose={onClose}>
                  <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Suppression de l'annonce</AlertDialog.Header>
                    <AlertDialog.Body>
                      Votre va annonce sera supprimée définitivement.
                      Voulez-vous vraiment continuer ?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                          Annuler
                        </Button>
                        <Button colorScheme="danger" onPress={() => deleteThisWorkspace(workSpace)}>
                          Supprimer
                        </Button>
                      </Button.Group>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog>

              </View>
            )
          }) : <Text>Vous n'avez pas encore posté d'annonces</Text>
        }
      </ScrollView>
    </Center>
  )
}