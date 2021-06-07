import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        //tela inteira
        flex: 1,
        backgroundColor: '#FFF',
        //alinhamento na horizontal
        alignItems: 'center',
        //alinhamento na vertical
        justifyContent: 'flex-start'
    },
    filter: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        height: 70,
        alignItems: 'center'
    },
    filterTextActived: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#EE6B26'
    },
    filterTextInative: {
        color: '#20295F',
        fontWeight: 'bold',
        fontSize: 18,
        //intervalo de 0 a 1
        opacity: 0.5
    }
});

export default styles;