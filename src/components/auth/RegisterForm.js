import React, { useState } from 'react'
import { Button, FormControl, Input, Center, Box, Heading, VStack, HStack, Link } from 'native-base'

function RegisterForm({ onRegister }) {
  const [showPassword, setShowPassword] = useState(false)
  const [registrationCredentials, setRegistrationCredentials] = useState({
    email: 'bob1@kowak.fr',
    password: '12345678',
    password_confirmation: '12345678',
    phone: '',
    firstName: 'bob1',
    lastName: 'bob1',
    job: ''
  })

  return <Center w="100%">
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
        Welcome
      </Heading>
      <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input type="password" />
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={() => onRegister(registrationCredentials)}>
          Sign up
        </Button>
      </VStack>
    </Box>
  </Center>
}

export default RegisterForm
