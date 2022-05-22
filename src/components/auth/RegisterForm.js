import React, { useState } from 'react'
import { FormControl, Input, Center, Box, Heading, VStack, HStack, Link, Icon, WarningOutlineIcon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from '../Button'

function RegisterForm({ onRegister }) {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [registrationCredentials, setRegistrationCredentials] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    firstName: '',
    lastName: '',
    job: ''
  })

  const checkPasswordRules = (password) => {
    console.log('password', password)
    const rules = {
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
    console.log('rules', rules)
    return rules
  }

  const validate = () => {
    const errors = {}
    if (!registrationCredentials.email) errors.email = 'Renseignez votre email'
    if (!registrationCredentials.password) errors.password = 'Le mot de passe est obligatoire et doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
    if (!registrationCredentials.password_confirmation) errors.password_confirmation = 'Veuillez confirmer votre mot de passe'
    if (!registrationCredentials.firstName) errors.firstName = 'Veuillez renseigner votre prénom'
    if (!registrationCredentials.lastName) errors.lastName = 'Veillez renseigner votre nom'
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      onRegister(registrationCredentials)
    }
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          S'INSCRIRE
        </Heading>

        <VStack space={3} mt="5">
          <HStack
            justifyContent="space-between">
            <FormControl
              isInvalid={errors.lastName ? true : false}
              width={'45%'}>
              <FormControl.Label>Nom*</FormControl.Label>
              <Input
                onChangeText={text => {
                  setRegistrationCredentials({ ...registrationCredentials, lastName: text })
                  errors.lastName = false
                }}
                type='text'
                placeholder='nom'
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.lastName}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={errors.firstName ? true : false}
              width={'45%'}>
              <FormControl.Label>Prénom*</FormControl.Label>
              <Input
                onChangeText={text => {
                  setRegistrationCredentials({ ...registrationCredentials, firstName: text })
                  errors.firstName = false
                }}
                type='text'
                placeholder='prénom'
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.firstName}
              </FormControl.ErrorMessage>
            </FormControl>
          </HStack>

          <FormControl
            isInvalid={errors.email ? true : false}>
            <FormControl.Label>Adresse mail*</FormControl.Label>
            <Input
              onChangeText={text => {
                setRegistrationCredentials({ ...registrationCredentials, email: text })
                errors.email = false
              }}
              type='email'
              placeholder='adresse mail'
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.email}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password ? true : false}>
            <FormControl.Label>Mot de passe*</FormControl.Label>
            <Input
              onChangeText={text => {
                setRegistrationCredentials({ ...registrationCredentials, password: text })
                errors.password = false
              }}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={5}
                  mr="12"
                  color="muted.400"
                  style={{
                    paddingRight: 10,
                    fontSize: 20
                  }}
                  onPress={() => setShowPassword(!showPassword)} />}
              placeholder='mot de passe'
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.password}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password_confirmation ? true : false}>
            <FormControl.Label>Confirmer votre mot de passe*</FormControl.Label>
            <Input
              onChangeText={text => {
                setRegistrationCredentials({ ...registrationCredentials, password_confirmation: text })
                errors.password_confirmation = false
              }}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={5}
                  mr="12"
                  color="muted.400"
                  style={{
                    paddingRight: 10,
                    fontSize: 20
                  }}
                  onPress={() => setShowPassword(!showPassword)} />}
              placeholder='confirmer votre mot de passe'
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.password_confirmation}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>Téléphone</FormControl.Label>
            <Input
              onChangeText={text => setRegistrationCredentials({ ...registrationCredentials, phone: text })}
              keyboardType='phone-pad'
              placeholder='0612345678'
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Quel est votre profession ?</FormControl.Label>
            <Input
              onChangeText={text => setRegistrationCredentials({ ...registrationCredentials, job: text })}
              type='text'
              placeholder='Votre profession'
            />
          </FormControl>

          <Button text={"S'INSCRIRE"} validate={validate} />

        </VStack>
      </Box>
    </Center>
  )
}

export default RegisterForm
