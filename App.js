import React from 'react';
import Home from "./src/views/Home";
import Task from "./src/views/Task";
import QrCode from "./src/views/QrCode";
import {LogBox} from "react-native";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

LogBox.ignoreAllLogs();

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        Task,
        QrCode
    })
);
export default function App() {
    return <Routes/>;
}

