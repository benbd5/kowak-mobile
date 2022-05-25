import React, { useState } from 'react'
import { Text, FormControl, Input, Center, Box, Heading, VStack, HStack, Link, Checkbox } from 'native-base'
import Button from '../Button'

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    device_name: 'device',
  })

  const validate = () => {
    onLogin(credentials)
  }

  return (
    <Center w="100%" backgroundColor={'#fff'}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          SE CONNECTER
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Adresse mail*</FormControl.Label>
            <Input
              onChangeText={text => setCredentials({ ...credentials, email: text })}
              value={credentials.email}
              placeholder='contact@kowak.fr'
              borderRadius={0}
              borderColor="black"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Mot de passe*</FormControl.Label>
            <Input
              onChangeText={text => setCredentials({ ...credentials, password: text })}
              value={credentials.password}
              type="password"
              borderRadius={0}
              borderColor="black"
              accessibilityLabel='Mot de passe'
            />
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-start" mt="1">
              Mot de passe oublié ?
            </Link>
          </FormControl>

          <Button text={'CONNEXION'} validate={validate} />

          <HStack mt="6" justifyContent="flex-start">
            <Checkbox checked={true} color="blue.700"
              borderRadius={0}
              accessibilityLabel="Remember me"
            />
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} marginLeft={2}>
              Rester connecté
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default LoginForm
