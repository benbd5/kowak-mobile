import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import DatepickerRange from 'react-native-range-datepicker';

export default function CalendarsList({ toggleModal, getDatesReservation, workSpace }) {
  const navigation = useNavigation();

  const onDayPress = day => {
    console.log('selected day on press', day);
  };

  const confirmDates = (startDate, untilDate) => {
    getDatesReservation(startDate, untilDate);
    navigation.navigate('Reservation', { startDate, untilDate, workSpace });
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