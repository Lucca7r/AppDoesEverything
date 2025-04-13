import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      gap: 8,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 40,
    },
    button: {
      backgroundColor: '#55a38b',
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    webviewContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
      borderRadius: 10,
      overflow: 'hidden',
    },
  });