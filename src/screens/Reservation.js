// import dayjs from 'dayjs';
import React from 'react';
import { Box, Button, Input, Text, View, VStack } from 'native-base';
import dayjs from 'dayjs';
import { reservationWorkspace } from '../services/api';
import ValidateButton from '../components/Button';
import { useNavigation } from '@react-navigation/native';

/**
 * 
 * @param {Date} dates Dates de réservation sélectionnées dans le calendrier 
 * @returns 
 */
export default function Reservation(dates) {
  const [numberOfDesk, setNumberOfDesk] = React.useState(0);
  const [numberOfDeskMax, setNumberOfDeskMax] = React.useState(5);
  const [numberOfDeskMin, setNumberOfDeskMin] = React.useState(1);

  const navigation = useNavigation();

  const startDate = dates.route.params.startDate.$d;
  let untilDate

  if (!dates.route.params.untilDate) {
    untilDate = startDate
  } else {
    untilDate = dates.route.params.untilDate.$d;
  }

  // convert dates to datetime format
  const startDateFormatted = dayjs(startDate).format('DD MMMM YYYY');
  const untilDateFormatted = dayjs(untilDate).format('DD MMMM YYYY');

  const validate = () => {
    const infos = {
      startDate: dayjs(startDate).format().split('+')[0],
      endDate: dayjs(untilDate).format().split('+')[0],
      workSpaceId: dates.route.params.workSpace,
    }
    reservationWorkspace(infos)
    navigation.navigate('Validated', 'Votre réservation a bien été enregistrée')
  }

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
      }}>
      <Text>Combien de bureaux à réserver ?</Text>
      <Input
        placeholder='Nombre de bureaux'
        keyboardType='numeric'
        onChangeText={(text) => {
          setNumberOfDesk(text)
        }} />

      <VStack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <VStack
          marginTop={7}
          space="4" mt="4"
          width={'40%'}>

          <VStack>
            <Box backgroundColor={'#2563eb'} padding={2}>
              <Text color={'white'}>
                {startDateFormatted === untilDateFormatted ? 'Date' : 'Dates'}
              </Text>
            </Box>
            <Text>
              {
                startDateFormatted === untilDateFormatted ? startDateFormatted : `${startDateFormatted} - ${untilDateFormatted}`
              }
            </Text>
          </VStack>
          <VStack>
            <Box backgroundColor={'#2563eb'} padding={2}>
              <Text color={'white'}>
                Heure
              </Text>
            </Box>
            <Text>
              9h - 18h
            </Text>
          </VStack>
          <VStack>
            <Box backgroundColor={'#2563eb'} padding={2}>
              <Text color={'white'}>
                Lieu
              </Text>
            </Box>
            <Text>
              Nantes
            </Text>
          </VStack>
        </VStack>

        <VStack
          marginTop={5}
          space="4" mt="4"
          width={'40%'}>
          <VStack>
            <Box backgroundColor={'yellow.200'} padding={2}>
              <Text>
                Espace
              </Text>
            </Box>
            <Text>
              {
                numberOfDesk ? numberOfDesk : 0
              } bureaux
            </Text>
          </VStack>
          <VStack>
            <Box backgroundColor={'yellow.200'} padding={2}>
              <Text>
                Tarif :
              </Text>
            </Box>
            <Text>
              18€
            </Text>
          </VStack>
          <VStack>
            <Box padding={2}>
              <Text>

              </Text>
            </Box>
            <Text>

            </Text>
          </VStack>
        </VStack>
      </VStack>

      <ValidateButton validate={validate} text='VALIDER' />

    </View>
  );
}