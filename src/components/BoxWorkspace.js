import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AspectRatio, Box, Heading, Image, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { likeWorkspace, userProfile } from '../services/api';

export default function BoxWorkspace({ workspace, favorites }) {
  console.log("workspaceBox", workspace);
  const navigation = useNavigation();

  // Check if the workspace is already in the favorite list of the current user
  const isFavorite = favorites.user.original.favorites.find(favorite => favorite.workSpaceId === workspace.workSpaceId);
  const [favorite, setFavorite] = useState(isFavorite);

  console.log("isFavorite", isFavorite);
  console.log('profile', favorites);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          await userProfile();
        } catch (error) {
          console.log('error', error);
        }
      }
      fetchUser();
    }, [])
  )

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

  return (
    <Box
      borderLeftColor='blue.600'
      borderLeftWidth={12}
      marginTop={10}
      marginLeft={3}
      width='90%'
      style={{
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Show', workspace.workSpaceId)}
        favorites={isFavorite}
      >
        <Box padding={3}>
          <Heading>
            {workspace.name}
          </Heading>

          <VStack direction={'row'} justifyContent='space-between'>
            <Text>
              {workspace.desk} bureaux
            </Text>

            {
              favorite ?
                <MaterialCommunityIcons name='heart' size={30} color='#2563eb' onPress={addToFavorite} />
                :
                <MaterialCommunityIcons name='heart-outline' size={30} color='#2563eb' onPress={addToFavorite} />
            }

          </VStack>
          <Text>
            {workspace.adress}
          </Text>
        </Box>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{ uri: 'https://img.freepik.com/photos-gratuite/interieur-espace-bureau-moderne_158595-5206.jpg?w=1380&t=st=1651931747~exp=1651932347~hmac=6c945fc3db79bafa39082cede77b1561cfe6508fd20944a93afae5e3a700c3fc' }} alt='desk' />
          </AspectRatio>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}