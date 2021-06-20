import React, {useState} from "react";
import {TouchableOpacity, Image, TextInput, Platform, View} from "react-native";
import styles from "./styles";
import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'
import {format} from "date-fns";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimeInputAndroid({type, save}) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateinput, setDateInput] = useState();
    const [timeinput, setTimeInput] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (event.nativeEvent.timestamp !== undefined) {
            if (!event.nativeEvent.timestamp.toString().includes('T')) {
                setDateInput(format(currentDate, 'yyyy-MM-dd'));
                save(format(currentDate, 'yyyy-MM-dd'));
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
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )
            }
        </View>
    )
};