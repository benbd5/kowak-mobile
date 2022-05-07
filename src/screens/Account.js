import { useFocusEffect } from '@react-navigation/native';
import { Divider, Heading, ScrollView, Skeleton, VStack, Avatar } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, Button, TouchableOpacity } from 'react-native'
import { logoutUser, useAuth } from '../contexts/AuthContext';
import { userProfile } from '../services/api';
import ToggleDarkMode from './../components/Theme/ToggleDarkMode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Loading from '../components/Loading';

function AccountScreen({ navigation }) {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true);

  const { dispatch } = useAuth()

  const getData = async () => {
    const response = await userProfile()
    await setProfile(response);
    await setLoading(false);
  }

  // Permet de récupérer les données de l'utilisateur connecté à chaque fois que l'on se rend sur la page Account
  useFocusEffect(
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
  )

  useEffect(async () => {
    await getData();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <ScrollView>
      <VStack space="2.5" mt="4" px="8">

        <Avatar
          size="lg"
          source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }}>
          BB
        </Avatar>
        <Heading size="lg">
          {profile.item.firstName}
        </Heading>

        <Heading size='md' marginTop='4'>
          Les essentiels
        </Heading>

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name="account" size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Informations personnnelles
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
        </TouchableOpacity>
        <Divider my="0.5" color='blue.900' />

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name='card-bulleted' size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Méthodes de paiement
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
          <Divider my="0.5" color='blue.900' />
        </TouchableOpacity>

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name='wallet' size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Mon portefeuille
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
          <Divider my="0.5" color='blue.900' />
        </TouchableOpacity>

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name='contactless-payment' size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Mes réservations
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
          <Divider my="0.5" color='blue.900' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Mes annonces')}>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name='home' size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Mes annonces
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
          <Divider my="0.5" color='blue.900' />
        </TouchableOpacity>

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <Ionicons name='notifications-outline' size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Notifications
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
          <Divider my="0.5" color='blue.900' />
        </TouchableOpacity>

        <Heading size='md' marginTop='4'>
          Les essentiels
        </Heading>

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name="accessibility" size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Accessibilité
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
        </TouchableOpacity>
        <Divider my="0.5" color='blue.900' />

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name="langues" size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Langues
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
        </TouchableOpacity>
        <Divider my="0.5" color='blue.900' />

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name="account-question-outline" size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              FAQ
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
        </TouchableOpacity>
        <Divider my="0.5" color='blue.900' />

        <TouchableOpacity>
          <VStack direction='row' justifyContent='space-between'>
            <MaterialCommunityIcons name="phone-in-talk-outline" size={20} />
            <Text style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              Contacter KOWAK
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </VStack>
        </TouchableOpacity>
        <Divider my="0.5" color='blue.900' />



        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button title="Déconnexion" onPress={() => logoutUser(dispatch)} />
        {/* <ToggleDarkMode /> */}
        {/* </View > */}
      </VStack>
    </ScrollView>
  );
}

export default AccountScreen