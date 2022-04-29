import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define the colorModeManager
const storeColorMode = async (value) => {
  try {
    console.log('storeColorMode: ', value);
    await AsyncStorage.setItem('@color-mode', value)
  } catch (e) {
    console.log(e);
  }
}

const getColorMode = async () => {
  try {
    console.log('getColorMode: ', getColorMode());
    let val = await AsyncStorage.getItem("@color-mode");
    return val === "dark" ? "dark" : "light";
  } catch (e) {
    return "light";
  }
}

export {
  storeColorMode,
  getColorMode
}