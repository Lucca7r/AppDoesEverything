import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import styles from '../style/HomeScreen.style';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Does Everything</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calculadora')}>
          <Text style={styles.buttonText}>Calculadora 🧮</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Navegador')}>
          <Text style={styles.buttonText}>Navegador 🧭</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Jogo da Velha')}>
          <Text style={styles.buttonText}>Jogo da Velha 🕹️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lista de Tarefas')}>
          <Text style={styles.buttonText}>Lista de Tarefas 📃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa')}>
          <Text style={styles.buttonText}>Me Mostra no Mapa 🗺️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
