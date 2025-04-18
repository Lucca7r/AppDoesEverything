import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import {
  View, Text, StyleSheet, FlatList, Modal, TextInput,
  Button, TouchableOpacity
} from 'react-native';
import { Overlay } from 'react-native-maps';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from '@react-native-picker/picker';


export default function TaskListScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const openModal = () => {
    setTaskName('');
    setStartDate('');
    setPriority('');
    setStatus('');
    setEditingIndex(null);
    setModalVisible(true);
  };

  const saveTask = () => {
    const newTask = { name: taskName, startDate, priority, status };
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = newTask;
      setTasks(updated);
    } else {
      setTasks([...tasks, newTask]);
    }
    setModalVisible(false);
  };

  const editTask = (index) => {
    const task = tasks[index];
    setTaskName(task.name);
    setStartDate(task.startDate);
    setPriority(task.priority);
    setStatus(task.status);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const deleteTask = (index) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'em andamento':
        return '#fff3cd'; // amarelo claro
      case 'finalizada':
        return '#d4edda'; // verde claro
      default:
        return '#ffffff'; // fundo padrão
    }
  };

  const handleDateChange = (text) => {
    setStartDate(text);
  
    // Verifica se a data está completa (10 caracteres)
    if (text.length === 10) {
      const [day, month, year] = text.split('/').map(Number);
  
      const date = new Date(year, month - 1, day);
  
      // Verifica se a data é válida e bate com o texto digitado
      const isValid =
        date &&
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
  
      if (!isValid) {
        setErrorVisible(true);
        setStartDate('');
      }
    }
  };

  const closeErrorModal = () => {
    setErrorVisible(false); // Fecha o modal de erro
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.taskItem, { backgroundColor: getStatusColor(item.status) }]}>
      <Text style={styles.taskText}>Nome: {item.name}</Text>
      <Text style={styles.taskText}>Início: {item.startDate}</Text>
      <Text style={styles.taskText}>Prioridade: {item.priority}</Text>
      <Text style={styles.taskText}>Status: {item.status}</Text>
      <View style={styles.taskButtons}>
        <Button title="Editar" onPress={() => editTask(index)} />
        <Button title="Excluir" color="red" onPress={() => deleteTask(index)} />
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
        <Text style={styles.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>

  
  <Modal visible={modalVisible} animationType="fade" transparent={true}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.modalOverlay}>
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
      <Button title="Salvar" onPress={saveTask} />
      <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
    </View>
  </View>
  </View>
  </TouchableWithoutFeedback>
  <Modal visible={errorVisible} transparent={true} animationType="fade">
        <View style={styles.errorOverlay}>
          <View style={styles.errorModalContainer}>
            <Text style={styles.errorTitle}>Erro</Text>
            <Text style={styles.errorText}>Data inválida. Por favor, insira uma data real.</Text>
            <Button title="Fechar" onPress={closeErrorModal} />
          </View>
        </View>
      </Modal>

</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#f2f2f2',
  },
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  header: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'
  },
  taskItem: {
    padding: 15, borderRadius: 8, marginBottom: 10, elevation: 1
  },
  taskText: {
    fontSize: 16
  },
  taskButtons: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 10
  },
  addButton: {
    backgroundColor: '#007bff', padding: 15, borderRadius: 50,
    position: 'absolute', bottom: 30, right: 30,
  },
  addButtonText: {
    color: '#fff', fontSize: 18, fontWeight: 'bold'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',          // ou algo como 300 se quiser fixo
    maxWidth: 400,         // limita em telas maiores
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10,
    borderRadius: 8, backgroundColor: '#fff'
  },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 20
  }
,label: {
  fontSize: 16,
  fontWeight: '600',
  marginTop: 10,
  marginBottom: 5,
},  errorOverlay: {
  flex: 1, justifyContent: 'center', alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
errorModalContainer: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 12,
  width: '80%',
  maxWidth: 350,
  elevation: 10,
},
errorTitle: {
  fontSize: 20, fontWeight: 'bold', color: 'black', marginBottom: 10, textAlign: 'center',
},
errorText: {
  fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20,
},

});
