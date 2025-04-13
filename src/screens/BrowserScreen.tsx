import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../style/BrowserScreen.styles'; // Importando o arquivo de estilos
import {WebView} from 'react-native-webview'; 

export default function BrowserScreen() {
  const [urlInput, setUrlInput] = useState('');
  const [urlToLoad, setUrlToLoad] = useState('');
  const handleLoadUrl = () => {
    let finalUrl = urlInput.trim();

    
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://${finalUrl}`;
    }
    setUrlToLoad(finalUrl);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Navegador Web</Text>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Digite a URL (ex: google.com)"
              style={styles.input}
              value={urlInput}
              onChangeText={setUrlInput}
              autoCapitalize="none"
              keyboardType="url"
            />
            <TouchableOpacity style={styles.button} onPress={handleLoadUrl}>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </View>

          {urlToLoad !== '' && (
            <View style={styles.webviewContainer}>
              <WebView source={{ uri: urlToLoad }} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}