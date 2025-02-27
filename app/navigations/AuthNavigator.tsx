import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    const authContext = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!authContext?.isAuthenticated ? (
                    <>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="SignIn" component={SignIn} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </>
                ) : (
                    // Redirect to Main App Screen (Dashboard, etc.)
                    <Stack.Screen name="Home" component={WelcomeScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;
