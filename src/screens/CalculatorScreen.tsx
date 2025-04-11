import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from '../style/CalculatorScreen.styles';

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
