import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCalc = (operation: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult(null);
      setModalVisible(true);
      return;
    }

    let res: number;
    switch (operation) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/':
        if (b === 0) {
          setResult(null);
          setModalVisible(true);
          return;
        }
        res = a / b;
        break;
      default: return;
    }

    setResult(res);
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Calculadora</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o primeiro número"
            keyboardType="numeric"
            value={num1}
            onChangeText={setNum1}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite o segundo número"
            keyboardType="numeric"
            value={num2}
            onChangeText={setNum2}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleCalc('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleCalc('-')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleCalc('*')}>
              <Text style={styles.buttonText}>×</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleCalc('/')}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
          </View>

          {/* Modal */}
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  {result === null ? 'Erro' : 'Resultado'}
                </Text>
                <Text style={styles.modalText}>
                  {result === null
                    ? 'Entrada inválida ou divisão por zero.'
                    : `O resultado é: ${result}`}
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: { fontSize: 28, marginBottom: 30, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
  },
  
  button: {
    backgroundColor: '#55a38b',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    minWidth: 60,
    alignItems: 'center',
  },

  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },


  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  modalButton: {
    backgroundColor: '#55a38b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});
