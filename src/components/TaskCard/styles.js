import {StyleSheet} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        height: 75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(49),
    },
    typeActive: {
        width: 50,
        height: 50,
    },
    cardTitle: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16
        // fontSize: responsiveFontSize(2)
    },
    cardRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    cardDate: {
        color: '#EE6B26',
        fontWeight: 'bold',
        fontSize: 16
        // fontSize: responsiveFontSize(2)
    },
    cardTime: {
        color: '#707070',
        // fontSize: responsiveFontSize(2)
    },
    done: {
        opacity: 0.5
    }
});

export default styles;
