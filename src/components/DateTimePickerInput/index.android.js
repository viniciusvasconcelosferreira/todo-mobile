import React, {useEffect, useState} from "react";
import {TouchableOpacity, Image, TextInput, Platform, View, Alert} from "react-native";
import styles from "./styles";
import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'
import {format, isPast} from "date-fns";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimeInputAndroid({type, save, dateWhen, hourWhen}) {
    const [dateNow, setDateNow] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateinput, setDateInput] = useState();
    const [timeinput, setTimeInput] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateNow;
        setShow(Platform.OS === 'ios');
        setDateNow(currentDate);
        if (event.nativeEvent.timestamp !== undefined) {
            if (!event.nativeEvent.timestamp.toString().includes('T')) {
                if (isPast(currentDate)) {
                    Alert.alert('Você não pode escolher uma data no passado!');
                } else {
                    setDateInput(format(currentDate, 'dd/MM/yyyy'));
                    save(format(currentDate, 'yyyy-MM-dd'));
                }
            } else {
                setTimeInput(format(currentDate, 'HH:mm'))
                save(format(currentDate, 'HH:mm:ss'));
            }
        }

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        if (dateWhen) {
            setDateInput(format(new Date(dateWhen), 'dd/MM/yyyy'));
            save(format(new Date(dateWhen), 'yyyy-MM-dd'));
        }
        if (hourWhen) {
            setTimeInput(format(new Date(hourWhen), 'HH:mm'));
            save(format(new Date(hourWhen), 'HH:mm:ss'));
        }
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={type === 'date' ? showDatepicker : showTimepicker}>
                <TextInput style={styles.input}
                           placeholder={type === 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...'}
                           editable={false}
                           value={type === 'date' ? dateinput : timeinput}

                />
                <Image style={styles.iconTextInput} source={type === 'date' ? iconCalendar : iconClock}/>
            </TouchableOpacity>
            {
                show && (
                    <RNDateTimePicker
                        value={dateNow}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                    />
                )
            }
        </View>
    )
};
