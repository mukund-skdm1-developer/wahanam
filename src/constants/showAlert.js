import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const CustomAlert = ({ message, onClose }) => {
  return (
    <View style={styles.alertContainer}>
      <View style={styles.alert}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.okButton} onPress={onClose}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const showAlert = () => {
  // Render the CustomAlert component where you want it to appear
  return <CustomAlert message="Oops, something went wrong!" onClose={() => console.log('OK')} />;
};

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // For shadow effect (Android)
    shadowColor: '#000', // For shadow effect (iOS)
    shadowOffset: { width: 0, height: 2 }, // For shadow effect (iOS)
    shadowOpacity: 0.25, // For shadow effect (iOS)
    shadowRadius: 4, // For shadow effect (iOS)
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default showAlert;
