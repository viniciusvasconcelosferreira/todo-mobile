import React, {useState, useEffect} from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator
} from "react-native";
import * as Network from 'expo-network';
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
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState();
    const [load, setLoad] = useState(true);

    async function SaveTask() {
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

        if (id) {
            await api.put(`/task/${id}`, {
                macaddress,
                done,
                type,
                title,
                description,
                when: `${date}T${hour}.000`
            }).then((response) => {
                navigation.navigate('Home');
            }).catch((error) => {
                console.error(error);
            });
        } else {
            await api.post('/task', {
                macaddress,
                type,
                title,
                description,
                when: `${date}T${hour}.000`
            }).then((response) => {
                navigation.navigate('Home');
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    async function LoadTask() {
        await api.get(`/task/${id}`).then((response) => {
            setLoad(true);
            setDone(response.data.done);
            setType(response.data.type);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDate(response.data.when);
            setHour(response.data.when);
        }).catch((error) => {
            console.error(error);
        })
    }

    async function getMacAddress() {
        //TODO: change to react-native-device-info
        await Network.getMacAddressAsync().then(mac => {
            setMacaddress(mac);
            setLoad(false);
        }).catch((error) => {
            console.error(error);
        });
    }

    async function DeleteTask() {
        await api.delete(`task/${id}`).then(() => {
            navigation.navigate('Home');
        }).catch((error) => {
            console.error(error);
        });
    }


    async function Remove() {
        Alert.alert(
            'Remover Tarefa',
            'Deseja realmente remover essa tarefa',
            [
                {text: 'Cancelar'},
                {text: 'Confirmar', onPress: () => DeleteTask()},
            ],
            {cancelable: true}
        );
    }


    useEffect(() => {
        getMacAddress();
        if (navigation.state.params) {
            setId(navigation.state.params.idTask);
            LoadTask().then(() => setLoad(false));
        }

    }, [macaddress]);

    return (
        <KeyboardAvoidingView /*behavior='padding'*/ style={styles.container}>
            <Header showBack={true} navigation={navigation}/>
            {
                load ?
                    <ActivityIndicator color='#EE6B26' size={50} style={{marginTop: 250}}/>
                    :
                    <ScrollView style={{width: '100%'}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                    style={{marginVertical: 10}}>
                            {
                                typeIcons.map((icon, index) => (
                                    icon !== null &&
                                    <TouchableOpacity onPress={() => setType(index)}>
                                        <Image key={index} source={icon}
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
                        <DateTimePickerInput type={'date'} save={setDate} dateWhen={date}/>
                        <DateTimePickerInput type={'hour'} save={setHour} hourWhen={hour}/>

                        {
                            id &&
                            <View style={styles.inLine}>
                                <View style={styles.inputInLine}>
                                    <Switch onValueChange={() => setDone(!done)} value={done}
                                            thumbColor={done ? '#EE6B26' : '#20295F'}/>
                                    <Text style={styles.switchLabel}>Concluído</Text>
                                </View>
                                <TouchableOpacity onPress={Remove}>
                                    <Text style={styles.removeLabel}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </ScrollView>
            }
            <Footer icon={'save'} onPress={SaveTask}/>
        </KeyboardAvoidingView>
    )
}
