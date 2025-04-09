import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import BrowserScreen from '../screens/BrowserScreen';
import TicTacToeScreen from '../screens/TicTacToeScreen';
import TaskListScreen from '../screens/TaskListScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calculadora" component={CalculatorScreen} />
        <Stack.Screen name="Navegador" component={BrowserScreen} />
        <Stack.Screen name="Jogo da Velha" component={TicTacToeScreen} />
        <Stack.Screen name="Lista de Tarefas" component={TaskListScreen} />
        <Stack.Screen name="Mapa" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
