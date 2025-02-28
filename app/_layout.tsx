import { Stack } from 'expo-router/stack';
import { PaperProvider } from "react-native-paper";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../Store/Store";
import { LogBox } from "react-native";

export default function Layout() {

    return (
        <Provider store={store}>
                <Stack>
                    <Stack.Screen name="index" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
        </Provider>
    );
}
