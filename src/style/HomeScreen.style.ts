import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', 
    padding: 20, justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#55a38b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
