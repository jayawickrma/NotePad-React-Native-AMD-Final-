import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Slot, Tabs} from 'expo-router';
import {store} from "@/Store/Store";
import {Provider} from "react-redux";

export default function TabLayout() {
    return (


                <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
                <Slot />
                    <Tabs.Screen
                        name="Notepad"
                        options={{
                            title: 'Notes',
                            tabBarIcon: ({ color }) => <FontAwesome size={28} name="sticky-note-o" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="CreateNewNote"
                        options={{
                            title: 'Add New',
                            tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil-square-o" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: 'User',
                            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-o" color={color} />,
                        }}
                    />
        </Tabs>

    );
}
