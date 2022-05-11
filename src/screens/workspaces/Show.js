import { AspectRatio, Avatar, Box, Divider, Heading, HStack, Image, Modal, ScrollView, Text, View, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { likeWorkspace, showSpecificWorkspace } from "../../services/api";
import Map from "../../components/Map";
import Loading from "../../components/Loading";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CalendarsList from "../../components/Calendar";

/**
 * 
 * @param {*} workSpace params de la navigation = id du workspace
 * @param {*} favorites  
 * @returns 
 */
export default function Show(workSpace, { favorites }) {
  console.log("favorites", favorites);
  const id = workSpace.route.params
  const navigation = useNavigation();

  const [workspace, setWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0
  })
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const getDatesReservation = (startDate, endDate) => {
    if (!endDate) {
      endDate = startDate
    }
    console.log("startDate", startDate);
    console.log("endDate", endDate);
  }

  // Check if the workspace is already in the favorite list of the current user
  // const isFavorite = favorites.user.original.favorites.find(favorite => favorite.workSpaceId === workspace.workSpaceId);
  // Check if the workspace is already in the favorite list of the current user
  const isFavorite = () => {
    setLoading(true)
    if (favorites) {
      setLoading(false)
      return favorites.user.original.favorites.find(favorite => favorite.workSpaceId === workspace.workSpaceId);
    }
  }
  const [favorite, setFavorite] = useState(isFavorite);
  // const [favorite, setFavorite] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await showSpecificWorkspace(id)
      console.log("Show", response);
      setWorkspace(response);
      setCoordinate({
        latitude: Number(response.latitude),
        longitude: (response.longitude)
      })
      setLoading(false);
    }
    getData();
  }, []);

  // Add to favorite
  const addToFavorite = async () => {
    await likeWorkspace(workspace.workSpaceId)
    if (favorite) {
      setFavorite(false)
    }
    else {
      setFavorite(true)
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <ScrollView
        style={{ maxWidth: '100%' }}
        h='100%'
        w='90%'>

        {
          favorite && (
            <MaterialCommunityIcons name="heart" size={30} color="#2563eb" onPress={() => addToFavorite()} />
          )
        }

        {/* {
          favorite ?
            <MaterialCommunityIcons name='heart' size={30} color='#2563eb' onPress={addToFavorite} />
            :
            <MaterialCommunityIcons name='heart-outline' size={30} color='#2563eb' onPress={addToFavorite} />
        } */}

        <Box
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderColor: '#2563eb',
            borderWidth: 0.5,
          }}>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{ uri: 'https://img.freepik.com/photos-gratuite/interieur-espace-bureau-moderne_158595-5206.jpg?w=1380&t=st=1651931747~exp=1651932347~hmac=6c945fc3db79bafa39082cede77b1561cfe6508fd20944a93afae5e3a700c3fc' }} alt='desk' />
          </AspectRatio>
        </Box>

        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box
            style={{
              padding: 10,
              backgroundColor: '#2563eb',
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#fff' }}>18€ / jour</Text>
          </Box>
          <Text>
            {workspace.adress}
          </Text>
        </HStack>

        <Heading
          marginTop={7}
        >{workspace?.name}</Heading>

        <VStack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <VStack
            marginTop={7}
            space="4" mt="4"
            width={'40%'}>

            <Box backgroundColor={'yellow.300'} padding={2}>
              <HStack>
                <Text>
                  {workspace?.surface}m²
                </Text>
              </HStack>
            </Box>
            <Box backgroundColor={'yellow.300'} padding={2}>
              <HStack>
                <Text>
                  {workspace?.desk} bureaux
                </Text>
              </HStack>
            </Box>
            <Box backgroundColor={'yellow.300'} padding={2}>
              <HStack>
                <Text>
                  {workspace?.computerScreen} écrans
                </Text>
              </HStack>
            </Box>
          </VStack>

          <VStack
            marginTop={7}
            space="4" mt="4"
            width={'40%'}>
            <Box backgroundColor={'yellow.300'} padding={2}>
              <HStack>
                <Text>
                  {workspace?.projector} projecteurs
                </Text>
              </HStack>
            </Box>
            <Box backgroundColor={'yellow.300'} padding={2}>
              <HStack>
                <Text>
                  Parking :
                  {workspace?.parking == 1 ? ' Oui' : ' Non'}
                </Text>
              </HStack>
            </Box>
            <Box backgroundColor={'yellow.300'} padding={2}>
              <HStack>
                <Text>
                  Accès PMR :
                  {workspace?.handicappedPersonsAccess == 1 ? ' Oui' : ' Non'}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>

        <VStack
          justifyContent={'center'}>

          <Divider
            margin={10}
          />

          <Box
            style={{
              padding: 20,
              marginBottom: 20,
              borderColor: '#000',
              borderWidth: 0.75,
            }}>
            <Text>{workspace?.description}</Text>
          </Box>

          {/* Ouverture du modal au clic */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowModal(true)}
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
              RESERVER
            </Text>
          </TouchableOpacity>

          {/* Modal pour sélectionner les dates de début et de fin de réservation */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={'full'} >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>
                Réservation
              </Modal.Header>
            </Modal.Content>
            <CalendarsList toggleModal={toggleModal} getDatesReservation={getDatesReservation} workSpace={workSpace.route.params} />
          </Modal>


          <Divider
            marginTop={8}
            borderColor={'#2563eb'}
            color='#2563eb'
          />

          <HStack
            alignItems={'center'}
            justifyContent={'space-around'}
            margin={3}
          >
            <Avatar
              size="md"
              source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }}>
              BB
            </Avatar>

            <VStack>
              <Text>
                {workspace?.users_appartenir[0].firstName} met à louer ce bureau.
              </Text>
              <Text>
                Allez checker son profil !
              </Text>
            </VStack>
            <Box
              style={{
                padding: 5,
                backgroundColor: '#2563eb',
                borderColor: '#000',
                borderWidth: 0.75,
                width: '20%',
                justifyContent: 'center',
                paddingLeft: '5%',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile du loueur', { user: workspace?.users_appartenir[0] })}>
                <MaterialCommunityIcons name="eye" size={30} color="#fff" />
              </TouchableOpacity>
            </Box>
          </HStack>

          <Divider
            marginBottom={8}
            borderColor={'#2563eb'}
            color='#2563eb'
          />

        </VStack>

        {
          coordinate.latitude !== 0 && coordinate.longitude !== 0 ?
            <Map
              coordinate={coordinate}
            />
            :
            <Text>Aucune coordonnées</Text>
        }
      </ScrollView >
    </View >
  );
}