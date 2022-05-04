import React from 'react'
import { Box, Center, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { registerUser, useAuth } from './../contexts/AuthContext'
import RegisterForm from './../components/auth/RegisterForm'

function RegisterScreen({ navigation }) {

  const { dispatch } = useAuth()

  const handleRegister = async (credentials) => {
    await registerUser(credentials, dispatch)
  }

  return (
    <Box>
      <Center>
        <RegisterForm onRegister={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Pas de compte ?</Text>
        </TouchableOpacity>
      </Center>
    </Box>
  )
}

export default RegisterScreen
