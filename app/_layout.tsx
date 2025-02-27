import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

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
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="creative-commons" color={color} />,
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
