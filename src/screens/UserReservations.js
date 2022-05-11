import { ScrollView, Text, View } from 'native-base';
import React from 'react';
import BoxWorkspace from '../components/BoxWorkspace';

export default function UserReservation(profile) {
  const reservations = profile.route.params.data
  console.log(reservations);

  // filter the reservations by startDate and sort them by startDate
  const reservationsByDate = reservations.filter(reservation => reservation.startDate).sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate)
  }
  )

  console.log('reservationsByDate', reservationsByDate)

  // Afin de trier les réservations et n'afficher que les réservations qui sont dans le futur et aujourd'hui
  // On va utiliser la date d'aujourd'hui - un jour pour avoir la date d'aujourd'hui
  let dateOfToday = new Date()
  dateOfToday.setDate(dateOfToday.getDate() - 1)

  const renderReservation = (reservation, index) => {
    console.log('new Date().getTime()', new Date().getTime())
    console.log('new Date(reservation.startDate).getTime()', new Date(reservation.startDate).getTime())
    if (new Date(reservation.startDate) > dateOfToday) {
      return (
        <BoxWorkspace key={index} workspace={reservation.workSpace} date={reservation.startDate} />
      )
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}>

      {reservationsByDate.map((reservation, index) => (
        renderReservation(reservation, index)
      ))}

    </ScrollView>
  );
}