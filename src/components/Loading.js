import React from 'react';
import { Skeleton } from 'native-base';

export default function Loading() {
  return (
    <>
      <Skeleton h={130} mb={3} />
      <Skeleton h={130} mb={3} />
      <Skeleton h={130} mb={3} />
      <Skeleton h={130} mb={3} />
    </>
  )
}