import React, {useState} from "react";
import {TouchableOpacity, Image, TextInput, DatePickerAndroid, TimePickerAndroid} from "react-native";
import styles from "./styles";
import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'
import {format} from "date-fns";

export default function DateTimeInputAndroid({type, save}) {
    const [datetime, setDateTime] = useState();
    const currentYear = parseInt(format(new Date(),'yyyy'));
    const currentMonth = parseInt(format(new Date(),'MM'));
    const currentDay = parseInt(format(new Date(),'dd'));

    async function selectDataOrHour() {
        if (type === 'date') {
            const {action, year, month, day} = await DatePickerAndroid.open({
                mode: 'calendar'
            });
            if (action === DatePickerAndroid.dateSetAction)
                setDateTime(`${day} - ${month} - ${year}`);
                save(format(new Date(year, month, day), 'yyyy-MM-dd'));
        } else {
            const {action, hour, minute} = await TimePickerAndroid.open({
                is24Hour: true
            });
            if (action !== TimePickerAndroid.dismissedAction)
                setDateTime(`${hour}:${minute}`);
                save(format(new Date(currentYear, currentMonth, currentDay,hour,minute,0,0), 'HH:mm:ss'));
        }
    }

    return (
        <TouchableOpacity onPress={selectDataOrHour}>
            <TextInput style={styles.input}
                       placeholder={type === 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...'}
                       editable={false} value={datetime}

            />
            <Image style={styles.iconTextInput} source={type === 'date' ? iconCalendar : iconClock}/>
        </TouchableOpacity>
    )
}