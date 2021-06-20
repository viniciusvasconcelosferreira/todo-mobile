import React from "react";
import {Platform} from "react-native";
import DateTimePickerInputAndroid from "./index.android";
import DateTimePickerInputIOS from "./index.ios";

export default function Index() {
    return (
        Platform.OS === 'android' ? <DateTimePickerInputAndroid/> : <DateTimePickerInputIOS/>
    );
}