import React from 'react';
import { HStack, Switch, Text, useColorMode } from "native-base";
import { getColorMode, storeColorMode } from './ColorModeManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  // Store the colorMode in AsyncStorage when the switch is toggled
  const toggleColorModeHandler = async () => {
    try {
      await storeColorMode(colorMode === 'light' ? 'dark' : 'light');
      toggleColorMode();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorModeHandler}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

export default ToggleDarkMode