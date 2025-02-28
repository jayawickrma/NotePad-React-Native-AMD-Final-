import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from "react-native";
import {router} from "expo-router";

export const saveToken = async (token: string) => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem('userToken', token);
        } else {
            await SecureStore.setItemAsync('userToken', token);
        }
    } catch (error) {
        console.error('Error saving token:', error);
    }
};
export const refreshToken = async (token: string) => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem('userToken', token);
        } else {
            await SecureStore.setItemAsync('userToken', token);
        }
    } catch (error) {
        console.error('Error saving token:', error);
    }
};
export const getToken = async () => {
    try {
        if (Platform.OS === 'web') {
            return await AsyncStorage.getItem('userToken');
        } else {
            return await SecureStore.getItemAsync('userToken');
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};
export const removeToken = async () => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem('userToken');
        } else {
            await SecureStore.deleteItemAsync('userToken');
        }
    } catch (error) {
        console.error('Error removing token:', error);
    }
};
export const logout = async () => {
    await AsyncStorage.removeItem("authToken"); // Clear stored session
    router.replace("/");
};