import React, {useState} from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import styles from "../DateTimeInput/styles";
import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";
import {Image, TouchableOpacity} from "react-native";

export default function DateTimeInputAndroid({type}) {
    const [datetime, setDateTime] = useState(new Date());
    return (
        <TouchableOpacity style={styles.input}>
            <RNDateTimePicker value={datetime} onChange={setDateTime} minimumDate={new Date()}/>
            <Image style={styles.iconTextInput} source={type === 'date' ? iconCalendar : iconClock}/>
        </TouchableOpacity>
    );
}