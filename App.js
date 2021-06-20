import React from 'react';
import Home from "./src/views/Home";
import Task from "./src/views/Task";
import {LogBox} from "react-native";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

LogBox.ignoreAllLogs();

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        Task
    })
);
export default function App() {
    return <Routes/>;
}

