import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import globalStyle from '../components/customContainer';
import imagePath from '../navStrings/imagePath';
import NavStrings from '../navStrings/NavStrings';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function Signup({ navigation }) {
  // State for form inputs and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Name validation
    if (name.trim() === '') {
      valid = false;
      newErrors.name = 'Name is required';
    }

    // Email validation (basic pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      valid = false;
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      valid = false;
      newErrors.email = 'Enter a valid email';
    }

    // Mobile number validation
    if (mobile.trim() === '') {
      valid = false;
      newErrors.mobile = 'Mobile number is required';
    }

    // Password validation
    if (password.trim() === '') {
      valid = false;
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      valid = false;
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigation.navigate(NavStrings.VERIFY, {
        name: name,
        email: email,
        mobile: mobile,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[globalStyle.customContainer]}>
        <View style={styles.formCont}>
          <Image source={imagePath.logo} style={[styles.logo, styles.signupLogo]} />
          <Text style={[globalStyle.mainHead, styles.signupHead]}>Sign up</Text>
          <Text style={[globalStyle.bodyText, styles.bodyText]}>Create an account with your details below</Text>

          <View style={styles.subFormCont}>
            {/* Name Field */}
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <TextInput
              style={[styles.txtInput, globalStyle.inpuText]}
              placeholder="Enter your name"
              placeholderTextColor="#777777"
              value={name}
              onChangeText={setName}
            />

            {/* Email Field */}
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
              style={[styles.txtInput, globalStyle.inpuText]}
              placeholder="Enter your email"
              placeholderTextColor="#777777"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            {/* Mobile Number Field */}
            {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
            <TextInput
              style={[styles.txtInput, globalStyle.inpuText]}
              placeholder="Enter your mobile number"
              placeholderTextColor="#777777"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />

            {/* Password Field */}
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TextInput
              style={[styles.txtInput, globalStyle.inpuText]}
              placeholder="Enter your password"
              placeholderTextColor="#777777"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            {/* Submit Button */}
            <View style={globalStyle.touchableBtnCont}>
              <TouchableOpacity onPress={handleSubmit} style={globalStyle.btn_cont}>
                <Text style={[globalStyle.btnText, { color: 'white' }]}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={[globalStyle.bodyText, styles.noAcc]}>Already have an account? <Text onPress={() => navigation.navigate(NavStrings.LOGIN)} style={[{ color: '#2AB74A', fontWeight: '900' }]}>Login</Text></Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width > 768 ? 30 : 0,
  },
  logo: {
    width: width * 0.5,  
    height: height * 0.2,
    resizeMode: 'contain',
  },
  signupHead: {
    marginTop: width > 768 ? 50 : 30,
    fontSize: width > 768 ? 28 : 24,
  },
  formCont: {
    marginTop: width > 768 ? 100 : 60,
    width: '100%',
  },
  signupLogo: {
    alignSelf: 'center',
  },
  bodyText: {
    marginTop: width > 768 ? 20 : 15,
    // fontSize: width > 768 ? 18 : 16,
    color: '#777777',
  },
  subFormCont: {
    width: '100%',
    marginTop: width > 768 ? 50 : 30,
  },
  txtInput: {
    height: 58,
    color: '#777777',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: width > 768 ? 16 : 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    alignSelf: 'flex-start', // Align error text to the top left
  },
});
