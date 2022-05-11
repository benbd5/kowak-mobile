import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import DatepickerRange from 'react-native-range-datepicker';

/**
 * 
 * @param {Function} toggleModal Fonction qui inverse le state du modal pour l'ouvrir ou le fermer
 * @param {Function} getDatesReservation Fonction qui renvoie les dates de réservation
 * @param {Id} workSpace Id du workspace récupéré dans l'écran précedent
 * @returns 
 */
export default function CalendarsList({ toggleModal, getDatesReservation, workSpace }) {
  const navigation = useNavigation();
  console.log(workSpace);
  console.log(toggleModal);
  console.log(getDatesReservation);


  const onDayPress = day => {
    console.log('selected day on press', day);
  };

  const confirmDates = (startDate, untilDate) => {
    getDatesReservation(startDate, untilDate);
    navigation.navigate('Réservation', { startDate, untilDate, workSpace });
    toggleModal()
  }

  return (
    <DatepickerRange
      startDate={onDayPress}
      untilDate={onDayPress}
      onSelect={onDayPress}
      onConfirm={(startDate, untilDate) => confirmDates(startDate, untilDate)}
      selectedBackgroundColor="#2563eb"
      buttonColor='#2563eb'
      minDate={dayjs().format('YYYY-MM-DD')}
      buttonText='Sélectionner vos dates'
      dayHeadings={['D', 'L', 'M', 'M', 'J', 'V', 'S']}
    />
  )
}