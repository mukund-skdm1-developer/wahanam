import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; 

function normalize(size) {
  return Math.round(size * scale);
}

const globalStyle = StyleSheet.create({
    customContainer: {
        alignItems: 'center',
        display: 'flex',
        padding:20,
        backgroundColor: '#F7F7F7',
    },
    mainHead: {
        // fontSize: normalize(30), 
        // color: 'black',
        // fontFamily: 'Lexend-VariableFont_wght',
    },
    heading1: {
        fontSize: normalize(18),  
        fontFamily: 'Lexend-VariableFont_wght',
    },
    subTitle: {
        fontSize: normalize(20),  
        fontWeight: '500',
    },
    btnText: {
        fontSize: normalize(16), 
        fontWeight: '600',
    },
    inpuText: {
        fontWeight: '400',
        color: '#777777',
        fontSize: normalize(14),  
    },
    bodyText: {
        fontSize: normalize(16), 
        fontWeight: '500',
        textAlign: 'justify',
        color: '#777777',
        fontFamily: 'Lexend-VariableFont_wghtc',
    },
    btn_cont: {
        height: 55,
        width: '100%',
        backgroundColor: '#FC4546',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        color: 'white',
        marginBottom: 10,
    },
    btn_txt: {
        color: 'white',
        fontSize: normalize(16),  
        fontFamily: 'Lexend-SemiBold',
    },
    touchableBtnCont: {
        width: '100%',
        paddingTop:20
    },
    iconSize:{
        fontSize: normalize(18),  
    }
});

export default globalStyle;
