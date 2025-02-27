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
                name="Write new Note"
                options={{
                    title: 'Write',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../Asserts/icons8-write-48.png')} // Update the path if needed
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                }}
            />;
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
