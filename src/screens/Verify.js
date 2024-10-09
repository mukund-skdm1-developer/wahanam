import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import globalStyle from '../components/customContainer';
import NavStrings from '../navStrings/NavStrings';
import imagePath from '../navStrings/imagePath';

export default function Verify({ navigation, route }) {
    const [otpEmail1, setOtpEmail1] = useState('');
    const [otpEmail2, setOtpEmail2] = useState('');
    const [otpEmail3, setOtpEmail3] = useState('');
    const [otpEmail4, setOtpEmail4] = useState('');
    const [otpMobile1, setOtpMobile1] = useState('');
    const [otpMobile2, setOtpMobile2] = useState('');
    const [otpMobile3, setOtpMobile3] = useState('');
    const [otpMobile4, setOtpMobile4] = useState('');
    const [errors, setErrors] = useState({});
    const [countdown, setCountdown] = useState(30);
    const [isCounting, setIsCounting] = useState(false);
    const { width, height } = Dimensions.get('window');

    const handleSubmit = () => {
        if (validate()) {
            navigation.navigate(NavStrings.LOGIN);
        }
    };
    useEffect(() => {
        let interval = null;
        if (isCounting && countdown > 0) {
            interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            clearInterval(interval);
            setIsCounting(false);
        }
        return () => clearInterval(interval);
    }, [isCounting, countdown]);

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (otpEmail1.trim() === '' || otpEmail2.trim() === '' || otpEmail3.trim() === '' || otpEmail4.trim() === '') {
            valid = false;
            newErrors.otpEmail = 'All OTP fields for email are required';
        }

        if (otpMobile1.trim() === '' || otpMobile2.trim() === '' || otpMobile3.trim() === '' || otpMobile4.trim() === '') {
            valid = false;
            newErrors.otpMobile = 'OTP for mobile is required';
        }

        setErrors(newErrors);
        return valid;
    };
    const resendOtp = () => {
        setCountdown(30);
        setIsCounting(true);

    };
    const { email, mobile } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[globalStyle.customContainer]}>
                <View style={styles.formCont}>
                    <Image source={imagePath.logo} style={[styles.logo, { width: width * 0.5, height: height * 0.2 }]} />
                    <Text style={[globalStyle.mainHead, styles.signupHead, { padding: 0, margin: 0 }]}>Verify your credentials</Text>
                    <Text style={[globalStyle.bodyText, styles.bodyText]}>
                        Enter the OTP that was sent to your +91 {mobile} & {email}{' '}
                        <Text style={styles.resend} onPress={() => navigation.navigate(NavStrings.SIGNUP)}>
                            Change Credentials?
                        </Text>
                    </Text>

                    {/* OTP for email */}
                    <View style={styles.subFormCont}>
                        <Text style={[globalStyle.bodyText, styles.otpText]}>Enter OTP for email</Text>
                        <View style={styles.circleCont}>
                            <TextInput
                                style={[styles.circle, otpEmail1.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpEmail1}
                                onChangeText={setOtpEmail1}
                            />
                            <TextInput
                                style={[styles.circle, otpEmail2.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpEmail2}
                                onChangeText={setOtpEmail2}
                            />
                            <TextInput
                                style={[styles.circle, otpEmail3.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpEmail3}
                                onChangeText={setOtpEmail3}
                            />
                            <TextInput
                                style={[styles.circle, otpEmail4.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpEmail4}
                                onChangeText={setOtpEmail4}
                            />
                        </View>

                        {errors.otpEmail && <Text style={styles.errorText}>{errors.otpEmail}</Text>}

                        {/* OTP for mobile */}
                        <Text style={[globalStyle.bodyText, styles.otpText]}>Enter OTP for mobile</Text>
                        <View style={styles.circleCont}>
                            <TextInput
                                style={[styles.circle, otpMobile1.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpMobile1}
                                onChangeText={setOtpMobile1}
                            />
                            <TextInput
                                style={[styles.circle, otpMobile2.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpMobile2}
                                onChangeText={setOtpMobile2}
                            />
                            <TextInput
                                style={[styles.circle, otpMobile3.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpMobile3}
                                onChangeText={setOtpMobile3}
                            />
                            <TextInput
                                style={[styles.circle, otpMobile4.trim() === '' ? styles.inactiveInput : styles.activeInput]}
                                maxLength={1}
                                placeholder="|"
                                placeholderTextColor="#777777"
                                keyboardType="numeric"
                                value={otpMobile4}
                                onChangeText={setOtpMobile4}
                            />
                        </View>
                        {errors.otpMobile && <Text style={styles.errorText}>{errors.otpMobile}</Text>}

                        {/* Didn't receive OTP */}
                        <Text style={[globalStyle.bodyText, styles.didnRecieve]}>
                            Didn't receive OTP?{' '}
                            {isCounting ? (
                                <Text style={styles.resend}>Resend in {countdown} seconds</Text>
                            ) : (
                                <Text style={styles.resend} onPress={resendOtp}>
                                    Resend OTP
                                </Text>
                            )}
                        </Text>

                        {/* Continue Button */}
                        <View style={globalStyle.touchableBtnCont}>
                            <TouchableOpacity onPress={handleSubmit} style={globalStyle.btn_cont}>
                                <Text style={[globalStyle.btnText, { color: 'white' }]}>Continue</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Terms & Conditions */}
                        <Text style={styles.terms}>
                            By continuing I agree to the <Text style={styles.underlineText}>Terms & Conditions</Text> of My Mechanic
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    signupHead: {
        marginTop: 30,
    },
    formCont: {
        marginTop: 80,
        width: '100%',
        paddingLeft: 25,
        paddingRight: 25,
    },
    signupLogo: {
        alignSelf: 'center',
    },
    bodyText: {
        marginTop: 15,
        color: '#777777',
    },
    subFormCont: {
        width: '100%',
        marginTop: 20,
    },
    txtInput: {
        width: '100%',
        height: 58,
        color: '#777777',
        paddingLeft: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    activeInput: {
        backgroundColor: '#FFFFFF', // White when filled
    },
    inactiveInput: {
        backgroundColor: '#E0E0E0',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    otpText: {
        color: '#242424',
        fontWeight: '800',
    },
    didnRecieve: {
        fontFamily: 'Lexend-Medium',
        paddingBottom: 10,
    },
    resend: {
        color: '#2AB74A',
        fontFamily: 'Lexend-Medium',
        fontWeight: '700',
    },
    terms: {
        color: '#777777',
        textAlign: 'center',
        marginTop: 10,
    },
    underlineText: {
        textDecorationLine: 'underline',
        fontWeight: '700',
        color: '#2AB74A',
    },
    circleCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    circle: {
        width: Dimensions.get('window').width * 0.15, // 15% of screen width
        height: Dimensions.get('window').height * 0.08, // 8% of screen height
        backgroundColor: 'white',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 0.5,
    },

});
