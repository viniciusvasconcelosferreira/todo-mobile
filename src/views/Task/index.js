import React, {useState} from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch, Alert
} from "react-native";
//COMPONENTES
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./styles";
import DateTimeInput from "../../components/DateTimeInput";
import DateTimePickerInput from '../../components/DateTimePickerInput';
//ICONES
import typeIcons from "../../utils/typeIcons";
//API
import api from "../../services/api";


export default function Task({navigation}) {
    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');

    async function New() {
        if (!title)
            return Alert.alert('Defina o nome da tarefa!');
        if (!description)
            return Alert.alert('Defina a descrição da tarefa!');
        if (!type)
            return Alert.alert('Escolha um tipo para a tarefa!');
        if (!date)
            return Alert.alert('Escolha uma data para tarefa!');
        if (!hour)
            return Alert.alert('Escolha uma hora para tarefa!');

        await api.post('/task', {
            macaddress,
            type,
            title,
            description,
            when: `${date}T${hour}.000`
        }).then(() => {
            navigation.navigate('Home');
        });
    }

    return (
        <KeyboardAvoidingView /*behavior='padding'*/ style={styles.container}>
            <Header showBack={true} navigation={navigation}/>
            <ScrollView style={{width: '100%'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
                    {
                        typeIcons.map((icon, index) => (
                            icon !== null &&
                            <TouchableOpacity onPress={() => setType(index)}>
                                <Image source={icon}
                                       style={[styles.imageIcon, type && type !== index && styles.typeIconInative]}/>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>

                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.input} maxLength={30} placeholder='Lembre-me de fazer...'
                           onChangeText={(text) => setTitle(text)} value={title}/>

                <Text style={styles.label}>Detalhes</Text>
                <TextInput style={styles.inputArea} maxLength={200} multiline={true}
                           placeholder='Detalhes da atividade que eu tenho que lembrar...'
                           onChangeText={(text) => setDescription(text)} value={description}/>
                {/*
                    ANDROID e IOS:
                        Para os antigos DatePickerAndroid e TimePickerAndroid utilizar os seguintes inputs:
                         <DateTimeInput type={'date'} save={setDate}/>
                         <DateTimeInput type={'hour'} save={setHour}/>
                */}
                <DateTimePickerInput type={'date'} save={setDate}/>
                <DateTimePickerInput type={'hour'} save={setHour}/>

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
            <Footer icon={'save'} onPress={New}/>
        </KeyboardAvoidingView>
    )
}