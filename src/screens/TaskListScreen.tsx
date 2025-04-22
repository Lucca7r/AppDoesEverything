import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { 
  View, Text, StyleSheet, FlatList, Modal, TextInput, 
  Button, TouchableOpacity, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/TaskListScreen';

interface Task {
  name: string;
  startDate: string;
  priority: string;
  status: string;
}

export default function TaskListScreen(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Função para salvar as tarefas no AsyncStorage
  const saveTasksToStorage = async (tasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    } catch (e) {
      console.error('Erro ao salvar tarefas:', e);
    }
  };

  // Função para carregar as tarefas do AsyncStorage
  const loadTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Erro ao carregar tarefas:', e);
      return [];
    }
  };

  // Carregar as tarefas ao iniciar a tela
  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await loadTasksFromStorage();
      setTasks(savedTasks);
    };

    fetchTasks();
  }, []);

  // Salvar as tarefas sempre que elas forem modificadas
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const openModal = () => {
    setTaskName('');
    setStartDate('');
    setPriority('');
    setStatus('');
    setEditingIndex(null);
    setModalVisible(true);
  };

  const saveTask = () => {
    if (!taskName || !startDate || !priority || !status) {
      setModalVisible(false);
      setErrorVisible(true);
      setErrorMessage('Preencha todos os campos!');
      return;
    }

    const newTask: Task = { name: taskName, startDate, priority, status };

    let updatedTasks;
    if (editingIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
    } else {
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    setModalVisible(false);
  };

  const editTask = (index: number) => {
    const task = tasks[index];
    setTaskName(task.name);
    setStartDate(task.startDate);
    setPriority(task.priority);
    setStatus(task.status);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const deleteTask = (index: number) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Em andamento':
        return '#fff3cd';
      case 'Finalizada':
        return '#d4edda';
      default:
        return '#ffffff';
    }
  };

  const handleDateChange = (text: string) => {
    setStartDate(text);
  
    // Só valida se tiver o tamanho mínimo de uma data completa
    if (text.length < 10) {
      setErrorVisible(true);
      setErrorMessage('Data inválida!');
      return;
    }
  
    const [day, month, yearStr] = text.split('/');
    const year = Number(yearStr);
    const monthNum = Number(month);
    const dayNum = Number(day);
  
    // Verificações básicas
    if (
      yearStr.length !== 4 ||
      isNaN(year) || isNaN(monthNum) || isNaN(dayNum) ||
      monthNum < 1 || monthNum > 12 ||
      dayNum < 1 || dayNum > 31
    ) {
      setErrorMessage('Data inválida!');
      setErrorVisible(true);
      return;
    }
  
    const date = new Date(year, monthNum - 1, dayNum);
    
    // Verifica se a data gerada bate com os dados fornecidos
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === monthNum - 1 &&
      date.getDate() === dayNum;
  
    // Se não for válida, exibe mensagem
    if (!isValid) {
      setErrorMessage('Data inválida! Por favor, insira uma data real.');
      setErrorVisible(true);
    } else {
      // Verifica se a data é no passado
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignora as horas para comparação
  
      if (date < today) {
        setErrorMessage('Data não pode ser no passado! Por favor, insira uma data futura.');
        setErrorVisible(true);
      } else {
        setErrorVisible(false);
      }
    }
  };

  const closeErrorModal = () => {
    setErrorVisible(false);
  };

  const renderItem = ({ item, index }: { item: Task; index: number }) => (
    <View style={[styles.taskItem, { backgroundColor: getStatusColor(item.status) }]}>
      <Text style={styles.taskText}>Nome: {item.name}</Text>
      <Text style={styles.taskText}>Início: {item.startDate}</Text>
      <Text style={styles.taskText}>Prioridade: {item.priority}</Text>
      <Text style={styles.taskText}>Status: {item.status}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity style={styles.button} onPress={() => editTask(index)}>
          <Button title="Editar" color='white' onPress={() => editTask(index)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteTask(index)}>
          <Button title="Excluir" color='white' onPress={() => deleteTask(index)} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas</Text>

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={{ flex: 1, width: '100%' }}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText} onPress={openModal}>+ Adicionar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {editingIndex !== null ? 'Editar Tarefa' : 'Nova Tarefa'}
              </Text>

              <Text style={styles.label}>Nome da Tarefa</Text>
              <TextInput
                style={styles.input}
                value={taskName}
                onChangeText={setTaskName}
                placeholder="Nome da tarefa"
                placeholderTextColor="#888"
              />

              <Text style={styles.label}>Data de Início</Text>
              <TextInputMask
                type={'datetime'}
                options={{ format: 'DD/MM/YYYY' }}
                style={styles.input}
                value={startDate}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#888"
                onChangeText={handleDateChange}
              />

              <Text style={styles.label}>Prioridade</Text>
              <TextInput
                style={styles.input}
                placeholder="baixa, média ou alta"
                placeholderTextColor="#888"
                value={priority}
                onChangeText={setPriority}
              />

              <Text style={styles.label}>Status</Text>
              <TextInput
                style={styles.input}
                placeholder="esperando, em andamento, finalizada"
                placeholderTextColor="#888"
                value={status}
                onChangeText={setStatus}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.button} onPress={saveTask}>
                  <Button title="Salvar" color="white" onPress={saveTask} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                  <Button title="Sair" color="white" onPress={() => setModalVisible(false)} />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={errorVisible} transparent animationType="fade">
        <View style={styles.errorOverlay}>
          <View style={styles.errorModalContainer}>
            <Text style={styles.errorTitle}>Erro</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                closeErrorModal();
                setModalVisible(true);
              }}
            >
              <Text style={styles.text} onPress={() => {
                closeErrorModal();
                setModalVisible(true);
              }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


