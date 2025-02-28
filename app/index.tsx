import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../Slices/UserSlice"; // Adjust the import path
import { Button, TextInput, View, Text, Alert } from 'react-native';
import {Link, useRouter} from 'expo-router';
import {UserModel} from "@/Model/UserModel";
import {AppDispatch} from "@/Store/Store";
import {getToken} from "@/Services/tokenService";

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // @ts-ignore
    const error = useSelector((state) => state.user.error);
    // @ts-ignore
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleLogin = async () => {

        console.log("handle login")
        try {
            const user = new UserModel(email, password);
            console.log("try in login")
            // @ts-ignore
            dispatch(login(user));
            Alert.alert('Login Successful', 'You have successfully logged in.');
            const token = await getToken();
            if (token) {
                console.log("login token")
                router.replace("/(tabs)/Notepad");
            } else {
                console.log("no token provided");
            }
        } catch (err) {
            Alert.alert('Login Failed', error || 'Please check your credentials.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign In</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
            />
            <Button title="Sign In" onPress={handleLogin} />
            <Link href="/" style={{ marginTop: 10, color: 'blue' }}>
                Don't have an account? Sign Up
            </Link>
        </View>
    );
};

export default SignIn;
