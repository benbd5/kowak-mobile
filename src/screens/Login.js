import React from 'react'
import { Box, Button, Center, Text } from 'native-base'
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
    <Box>
      <Center>
        <LoginForm onLogin={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>Pas de compte ?</Text>
          <Button onPress={() => logout()}>
            Logout
          </Button>
        </TouchableOpacity>
      </Center>
    </Box>
  )
}

export default LoginScreen
