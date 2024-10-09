import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyle from './customContainer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const ModalComponent = ({ modalVisible, setModalVisible, handleModalClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {/* Use react-native-vector-icons for the icon */}
          <FontAwesomeIcon style={{ color:'#2AB74A', marginBottom:30}} size={70} icon={faCircleCheck} />
          <Text style={styles.modalText}>
            Password reset link sent successfully to your registered email id
          </Text>
          <View style={globalStyle.touchableBtnCont}>
            <TouchableOpacity
              style={globalStyle.btn_cont}
              onPress={() => {
                handleModalClose(); // Close modal on button press
              }}
            >
              <Text style={[globalStyle.btnText, { color: 'white' }]}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '900',
    color: 'black',
    fontSize: 18,
    fontFamily: 'Lexend-ExtraBold',
  },
});

export default ModalComponent;
