import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../HomeScreen';
import MapScreen from '../MapScreen';
import OrderDetailsScreen from '../OrderDetailsScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
}