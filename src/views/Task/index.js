import React, {useState} from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch
} from "react-native";
//COMPONENTES
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import DateTimeInput from "../../components/DateTimeInput";
import DateTimePickerInput from '../../components/DateTimePickerInput';
//ICONES
import typeIcons from "../../utils/typeIcons";


export default function Task() {
    const [done, setDone] = useState(false);

    return (
        <KeyboardAvoidingView /*behavior='padding'*/ style={styles.container}>
            <Header showBack={true}/>
            <ScrollView style={{width: '100%'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
                    {
                        typeIcons.map(icon => (
                            icon !== null &&
                            <TouchableOpacity>
                                <Image source={icon} style={styles.imageIcon}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>

                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.input} maxLength={30} placeholder='Lembre-me de fazer...'/>

                <Text style={styles.label}>Detalhes</Text>
                <TextInput style={styles.inputArea} maxLength={200} multiline={true}
                           placeholder='Detalhes da atividade que eu tenho que lembrar...'/>
                {/*
                    ANDROID e IOS:
                        Para os antigos DatePickerAndroid e TimePickerAndroid utilizar os seguintes inputs:
                         <DateTimeInput type={'date'}/>
                         <DateTimeInput type={'hour'}/>
                */}
                <DateTimePickerInput type={'date'}/>
                <DateTimePickerInput type={'hour'}/>

                <View style={styles.inLine}>
                    <View style={styles.inputInLine}>
                        <Switch onValueChange={() => setDone(!done)} value={done}
                                thumbColor={done ? '#EE6B26' : '#20295F'}/>
                        <Text style={styles.switchLabel}>Concluído</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.removeLabel}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer icon={'save'}/>
        </KeyboardAvoidingView>
    )
}