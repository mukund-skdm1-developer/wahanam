import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import globalStyle from '../components/customContainer';
import imagePath from '../navStrings/imagePath';
import NavStrings from '../navStrings/NavStrings';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell, faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import Search from './Search';
import SearchComponent from '../components/SearchComponent';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
  const [name, setName] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.screenContainer}>
        <View style={styles.logo_cont}>
          <Image source={imagePath.logo} style={styles.logo} />
        </View>

        <SearchComponent />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    paddingTop:10
  },
  logo_cont: {
    width: width * 0.2,
    height: height * 0.1,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // backgroundColor: 'pink',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'yellow',
    //   paddingHorizontal: 10,
    borderRadius: 5,
  },
  txtInput: {
    flex: 1,
    height: 58,
    color: '#777777',
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: width > 768 ? 16 : 14,
    marginRight: 10,
  },
  bellIcon: {
    color: 'black',
    backgroundColor: 'pink',
  },
});

//    <View style={styles.inputRow}>
//    <TextInput
//      style={[styles.txtInput, globalStyle.inpuText]}
//      placeholder="Enter your name"
//      placeholderTextColor="#777777"
//      value={name}
//      onChangeText={setName}
//    />
//    <FontAwesomeIcon
//      style={styles.bellIcon}
//      size={30}
//      icon={faBell}
//    />
//  </View>
