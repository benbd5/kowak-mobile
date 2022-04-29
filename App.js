import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigator from './src/components/routes/Navigator';


const App = () => {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer >
      </NativeBaseProvider>
    </AuthProvider>
  );
}

export default App;
