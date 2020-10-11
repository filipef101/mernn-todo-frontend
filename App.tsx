import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Portal, Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from './components/Themed';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import ReactTooltip from 'react-tooltip';

export default function App() {
  const isLoadingComplete = useCachedResources();
  let colorScheme = useColorScheme();

  // return _useColorScheme()
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={{height: '99.9%'}}>
      <Provider>
        <Portal>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Portal>
      </Provider>
      <ReactTooltip />
      </View>
    );
  }
}
