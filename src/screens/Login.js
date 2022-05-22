import React from 'react'
import { Box, Center, HStack, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { loginUser, logoutUser, useAuth } from './../contexts/AuthContext'
import LoginForm from './../components/auth/LoginForm'
import { login, logout } from '../services/api'

function LoginScreen({ navigation }) {

  const { dispatch, state } = useAuth()

  const handleLogin = async (credentials) => {
    await login(credentials, dispatch)
    console.log('user login', state)
  }

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <Center backgroundColor={'#fff'}>
        <LoginForm onLogin={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <HStack>
            <Text>Vous n'êtes pas un kowakeur ?</Text>
            <Text marginLeft={2} underline>Inscrivez-vous !</Text>
          </HStack>
        </TouchableOpacity>
      </Center>
    </View>
  )
}

export default LoginScreen
