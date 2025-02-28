import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../Slices/UserSlice"; // Adjust the import path
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { UserModel } from "@/Model/UserModel";
import { AppDispatch } from "@/Store/Store";
import { getToken } from "@/Services/tokenService";
import { Ionicons } from '@expo/vector-icons';

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // @ts-ignore
    const error = useSelector((state) => state.user.error);
    // @ts-ignore
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing Information', 'Please enter both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            const user = new UserModel(email, password);
            // @ts-ignore
            await dispatch(login(user));
            const token = await getToken();

            if (token) {
                Alert.alert('Login Successful', 'Welcome back!');
                router.replace("/(tabs)/Notepad");
            } else {
                Alert.alert('Login Failed', 'Authentication failed. Please try again.');
            }
        } catch (err) {
            Alert.alert('Login Failed', error || 'Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ImageBackground
                    source={{ uri: "/api/placeholder/400/320" }}
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImageStyle}
                >
                    <View style={styles.overlay} />

                    <View style={styles.formContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Welcome Back</Text>
                            <Text style={styles.subHeaderText}>Sign in to continue</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color="#555" style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Email Address"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    placeholderTextColor="#888"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    style={[styles.input, styles.passwordInput]}
                                    placeholderTextColor="#888"
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.signInButtonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <Link href="/" style={styles.signupLink}>
                                Sign Up
                            </Link>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImageStyle: {
        opacity: 0.8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    formContainer: {
        marginHorizontal: 24,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    headerContainer: {
        marginBottom: 32,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        height: 56,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    passwordInput: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#4285F4',
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: '#4285F4',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: '#666',
        fontSize: 16,
    },
    signupLink: {
        color: '#4285F4',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SignIn;