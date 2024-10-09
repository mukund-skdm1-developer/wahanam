import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavStrings from '../navStrings/NavStrings';
import imagePath from '../navStrings/imagePath';
import globalStyle from '../components/customContainer';
import ModalComponent from '../components/ModalComponent';

const { width, height } = Dimensions.get('window');

export default function Forget({ navigation }) {
    // State for form inputs and error messages
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);  // State to handle modal visibility

    const validate = () => {
        let valid = true;
        let newErrors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            valid = false;
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            valid = false;
            newErrors.email = 'Enter a valid email';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            // Show modal with 2-second delay
            setTimeout(() => {
                setModalVisible(true);  // Show the modal after 2 seconds
            }, 2000);
        }
    };
    
    const handleModalClose = () => {
        setModalVisible(false);  // Close the modal
        navigation.navigate(NavStrings.LOGIN);  // Navigate to Login after closing modal
    };
    return (
        <View style={styles.fullScreen}>
            <View style={[styles.container, { flexDirection: 'column' }]}>
                <View style={styles.redContainer}>
                    <Image source={imagePath.logo} style={[styles.logo, styles.signupLogo]} />
                </View>
                <Text style={[globalStyle.mainHead, styles.signupHead]}>Reset Password</Text>
                <Text style={[globalStyle.bodyText, styles.bodyText]}>Enter your email id to reset your password</Text>

                <View style={styles.form_cont}>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <TextInput
                        style={[styles.txtInput, globalStyle.inpuText]}
                        placeholder="Enter your email address"
                        placeholderTextColor="#777777"
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={globalStyle.touchableBtnCont}>
                        <TouchableOpacity onPress={handleSubmit} style={globalStyle.btn_cont}>
                            <Text style={[globalStyle.btnText, { color: 'white' }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[globalStyle.bodyText, styles.noAcc]}>
                        Don't have an account?
                        <Text onPress={() => navigation.navigate(NavStrings.SIGNUP)} style={[{ color: '#2AB74A', fontWeight: '900' }]}> Sign up</Text>
                    </Text>
                </View>

                {/* <View style={styles.fourthCont}>
                    
                </View> */}
            </View>

            {/* Modal component for showing success message */}
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} handleModalClose={handleModalClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        padding: 20,
    },
    container: {
        flex: 1,
    },
    redContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 182,
        height: 128,
        resizeMode: 'contain',
    },
    txtInput: {
        width: '100%',
        height: 58,
        color: '#777777',
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: width > 768 ? 16 : 14,
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    fourthCont: {
        flex: 1,
        paddingHorizontal: width > 768 ? 25 : 15,
        justifyContent: 'flex-end',
    },
    bodyText: {
        marginTop: 5,
        marginBottom: 30,
        color: '#777777',
    },
    form_cont: {
        paddingTop: 30,
    },
    noAcc: {
        textAlign: 'center',
    },
});
