import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavStrings from '../navStrings/NavStrings';
import imagePath from '../navStrings/imagePath';
import globalStyle from '../components/customContainer';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  // State for form inputs and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otpCountdownMobile, setOtpCountdownMobile] = useState(0);
  const [otpCountdownPassword, setOtpCountdownPassword] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timer;
    if (otpCountdownMobile > 0 || otpCountdownPassword > 0) {
      timer = setInterval(() => {
        if (otpCountdownMobile > 0) setOtpCountdownMobile((prev) => prev - 1);
        if (otpCountdownPassword > 0) setOtpCountdownPassword((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [otpCountdownMobile, otpCountdownPassword]);

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
      navigation.navigate(NavStrings.SIGNUP);  // Navigate if form is valid
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={[styles.container, { flexDirection: 'column' }]}>
        <View style={styles.redContainer}>
          <Image source={imagePath.logo} style={[styles.logo, styles.signupLogo]} />
        </View>
        <Text style={[globalStyle.mainHead, styles.signupHead]}>Login</Text>
        <Text style={[globalStyle.bodyText, styles.bodyText]}>Create an account with your details below</Text>

        <View style={styles.form_cont}>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={[styles.txtInput, styles.inpuText]}
            placeholder="Enter your email address"
            placeholderTextColor="#777777"
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
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
        </View>
        <View style={styles.otpText}>
          <TouchableOpacity onPress={() => navigation.navigate(NavStrings.FORGET)} >
            <Text style={[styles.forgot,]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

        </View>
        <View style={globalStyle.touchableBtnCont}>
            <TouchableOpacity onPress={handleSubmit} style={globalStyle.btn_cont}>
              <Text style={[globalStyle.btnText, { color: 'white' }]}>Continue</Text>
            </TouchableOpacity>
          </View>
          <Text style={[globalStyle.bodyText, styles.noAcc]}>Don't have an account? <Text onPress={() => navigation.navigate(NavStrings.SIGNUP)} style={[{ color: '#2AB74A', fontWeight: '900' }]}>Sign up</Text></Text>

      </View>
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
  secondContainer: {
    flex: 1,
    paddingHorizontal: width > 768 ? 25 : 15,
    justifyContent: 'flex-end',
  },
  orangeContainer: {
    flex: 3,
    paddingHorizontal: width > 768 ? 25 : 15,
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
    marginBottom: 15,
    fontSize: width > 768 ? 16 : 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  otpText: {
    alignSelf: 'flex-end',
    color: '#2AB74A',
    fontFamily: 'Lexend-Medium',
    paddingTop: 0,
    fontSize: width > 768 ? 14 : 12,
  },
  fourthCont: {
    flex: 1,
    paddingHorizontal: width > 768 ? 25 : 15,
    justifyContent: 'flex-end',
  },
  // bodyText: {
  //   marginTop: 10,
  //   color: '#777777',

  //   fontSize: width > 768 ? 16 : 14, 
  // },
  bodyText: {
    marginTop: 15,
    color: '#777777',
  },
  form_cont: {
    paddingTop: 30,
    // backgroundColor:'blue'
  },
  noAcc: {
    textAlign: 'center'
  },
  forgot: {
    // marginTop: 10,
    color: '#FC4546',
    fontSize: width > 768 ? 16 : 14,
    fontWeight: 'bold',
    textAlign: 'justify',
    fontFamily: 'Lexend-VariableFont_wghtc',
  }
});
