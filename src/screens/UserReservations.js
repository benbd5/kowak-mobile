import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View } from 'native-base';
import React from 'react';
import BoxWorkspace from '../components/BoxWorkspace';
import DeleteAlertButton from '../components/DeleteAlertButton';
import { cancelReservation } from '../services/api';

export default function UserReservation(profile, { favorites }) {
  const reservations = profile.route.params.data
  console.log('reservations', reservations)
  console.log('favorites', favorites)

  console.log('reservations', reservations)
  const navigation = useNavigation();

  // filter the reservations by startDate and sort them by startDate
  let reservationsByDate

  if (reservations.length > 0) {
    reservationsByDate = reservations.filter(reservation => reservation.startDate).sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate)
    }
    )
  }

  // Afin de trier les réservations et n'afficher que les réservations qui sont dans le futur et aujourd'hui
  // On va utiliser la date d'aujourd'hui - un jour pour avoir la date d'aujourd'hui
  let dateOfToday = new Date()
  dateOfToday.setDate(dateOfToday.getDate() - 1)

  const renderReservation = (reservation, index) => {
    if (new Date(reservation.startDate) > dateOfToday) {
      return (
        <View>
          <BoxWorkspace key={index} workspace={reservation.workSpace} date={reservation.startDate} favorites={profile} />
          <DeleteAlertButton
            workspace={reservation.workSpace}
            text='ANNULER'
            validate={() => deleteThisWorkspace(reservation)}
            width='80%'
            marginLeft={35}
            marginBottom={10}
            textHeader={'Annulation de votre location'} />
        </View>
      )
    }
  }

  const deleteThisWorkspace = async (workspace) => {
    console.log("workspace", workspace);
    await cancelReservation(workspace);
    navigation.navigate('Validated', 'Votre location a bien été annulée !');
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}>

      {
        reservationsByDate ? reservationsByDate?.map((reservation, index) => (
          renderReservation(reservation, index)
        )) : <Text>Vous n'avez pas de réservation</Text>
      }

    </ScrollView>
  );
}