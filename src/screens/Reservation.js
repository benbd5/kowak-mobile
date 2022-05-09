import dayjs from 'dayjs';
import { Button, Text, View } from 'native-base';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { reservationWorkspace } from '../services/api';

export default function Reservation(dates) {
  const startDate = dates.route.params.startDate.$d;
  const untilDate = dates.route.params.untilDate.$d;
  if (!untilDate) {
    untilDate = startDate
  }

  // convert dates to datetime format
  const startDateFormatted = dayjs(startDate).format();
  const untilDateFormatted = dayjs(untilDate).format();

  const validate = () => {
    const infos = {
      startDate: startDateFormatted,
      endDate: untilDateFormatted,
      workSpaceId: dates.route.params.workSpace,
    }
    reservationWorkspace(infos)
  }

  return (
    <View>
      <Text>Votre réservation</Text>
      <Text>Du {startDateFormatted} au {untilDateFormatted}</Text>
      <Button onPress={() => validate()}>
        <Text>Valider</Text>
      </Button>
    </View>
  );
}