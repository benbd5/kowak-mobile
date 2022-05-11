import { useFocusEffect } from '@react-navigation/native';
import { Divider, Heading, ScrollView, Skeleton, VStack, Avatar } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, Button, TouchableOpacity } from 'react-native'
import { logoutUser, useAuth } from '../contexts/AuthContext';
import { getReservations, userProfile } from '../services/api';
import ToggleDarkMode from './../components/Theme/ToggleDarkMode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Loading from '../components/Loading';
import AccountMenu from '../components/AccountMenu';

function AccountScreen() {
  const [profile, setProfile] = useState()
  const [reservations, setReservations] = useState()
  const [loading, setLoading] = useState(true);

  const { dispatch } = useAuth()

  const getData = async () => {
    const response = await userProfile()
    const reservations = await getReservations()
    await setProfile(response);
    await setReservations(reservations);
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
    <ScrollView
      style={{ backgroundColor: '#fff' }}>
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

        <AccountMenu iconName="account" text="Informations personnnelles" />
        <AccountMenu iconName="card-bulleted" text="Méthodes de paiement" />
        <AccountMenu iconName="wallet" text="Mon portefeuille" />
        <AccountMenu iconName="contactless-payment" text="Mes réservations" nav='Mes réservations' profile={reservations} />
        <AccountMenu iconName="home" text="Mes annonces" nav='Mes annonces' />

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

        <AccountMenu iconName="chevron-right" text="Accessibilité" />
        <AccountMenu iconName="chevron-right" text="Langues" />
        <AccountMenu iconName="account-question-outline" text="FAQ" />
        <AccountMenu iconName="phone-in-talk-outline" text="Contacter KOWAK" />

        <Button title="Déconnexion" onPress={() => logoutUser(dispatch)} />
        {/* <ToggleDarkMode /> */}
      </VStack>
    </ScrollView>
  );
}

export default AccountScreen