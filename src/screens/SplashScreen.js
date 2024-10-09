import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZE } from '../constants/theme';
import imagePath from '../navStrings/imagePath';
import NavStrings from '../navStrings/NavStrings';
import globalStyle from '../components/customContainer';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // Base width iPhone X
const verticalScale = SCREEN_HEIGHT / 812; // Base height iPhone X

function normalize(size) {
    return Math.round(size * scale);
}

function verticalNormalize(size) {
    return Math.round(size * verticalScale);
}

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(NavStrings.HOME);
        }, 3000);
    }, []);

    return (
        <>
            <View style={[globalStyle.customContainer, { }]}>
                <View style={styles.logoCont}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/logo.png')}
                    />
                </View>
                <Image
                    style={styles.mech}
                    source={require('../assets/images/mech.png')}
                />

                <View style={styles.sub_heading_cont}>
                    <Text style={[styles.splashTitle, globalStyle.mainHead, {fontFamily:'Merriweather-BlackItalic'}]}>Transparent bike service</Text>
                </View>
                <Text style={[globalStyle.bodyText]}>
                    Transparent bike service offers honest pricing, real-time updates, skilled technicians, and clear communication for seamless, trustworthy repairs.
                </Text>
                <View style={globalStyle.touchableBtnCont}>

                </View>

            </View>
            <View style={[styles.customContainer, { flex: 2, display: 'flex', justifyContent: 'flex-end', height: '100%' }]}>
                <TouchableOpacity onPress={() => navigation.navigate(NavStrings.SIGNUP)} style={globalStyle.btn_cont}>
                    <Text style={[globalStyle.btnText, { color: 'white' }]}>Next</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    customContainer: {
        alignItems: 'center',
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#F7F7F7',
    },
    logoCont: {
        marginTop: verticalNormalize(50),
        marginBottom: verticalNormalize(50),
    },
    logo: {
        width: normalize(116),
        height: verticalNormalize(60),
        resizeMode: 'contain',
    },
    mech: {
        height: verticalNormalize(320),
        width: '100%',
        resizeMode: 'contain',
    },
    splashTitle: {
        fontSize: normalize(30), 
        textAlign: 'center',      
        color:'black',
        width: '100%',       
        fontWeight:'650',    
        fontFamily:'Merriweather-BlackItalic',
    },
    sub_heading_cont: {
        paddingTop: verticalNormalize(30),
        alignItems: 'center',     // Centers the subheading container horizontally
        justifyContent: 'center', // Centers the text vertically
    },
});
