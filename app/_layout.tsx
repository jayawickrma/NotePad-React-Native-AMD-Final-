import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Notes',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="sticky-note" color={color} />,
                }}
            />
            <Tabs.Screen
                name="newNote"
                options={{
                    title: 'New Note',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="sticky-note" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
