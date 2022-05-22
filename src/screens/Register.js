import React from 'react'
import { Box, Center, HStack, ScrollView, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { registerUser, useAuth } from './../contexts/AuthContext'
import RegisterForm from './../components/auth/RegisterForm'
import { register } from '../services/api'

function RegisterScreen({ navigation }) {

  const { dispatch, state } = useAuth()

  const handleRegister = async (credentials) => {
    await register(credentials, dispatch)
    console.log('user register', state)
  }

  return (
    <ScrollView style={{ height: '100%', backgroundColor: '#fff' }}>
      <Center>
        <RegisterForm onRegister={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <HStack>
            <Text>Vous êtes déjà un kowakeur ?</Text>
            <Text marginLeft={2} underline>Connectez-vous !</Text>
          </HStack>
        </TouchableOpacity>
      </Center>
    </ScrollView>
  )
}

export default RegisterScreen
