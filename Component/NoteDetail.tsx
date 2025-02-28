import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface NoteDetailProps {
    note: {
        id: string;
        title: string;
        content: string;
        date: string;
        color: string;
    };
    onClose: () => void;
    onEdit: (id: string, title: string, content: string) => void;
    onDelete: (id: string) => void;
}

const NoteDetail = ({ note, onClose, onEdit, onDelete }: NoteDetailProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);

    const handleSave = () => {
        if (!editedTitle.trim()) {
            Alert.alert('Error', 'Title cannot be empty');
            return;
        }

        onEdit(note.id, editedTitle, editedContent);
        setIsEditing(false);
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => {
                        onDelete(note.id);
                        onClose();
                    },
                    style: 'destructive'
                },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: note.color }]}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onClose}
                    >
                        <Ionicons name="chevron-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.headerButtonsContainer}>
                        {isEditing ? (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={handleSave}
                            >
                                <Ionicons name="save-outline" size={24} color="#333" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={() => setIsEditing(true)}
                            >
                                <Ionicons name="pencil-outline" size={24} color="#333" />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={handleDelete}
                        >
                            <Ionicons name="trash-outline" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.dateText}>{note.date}</Text>
                </View>

                <ScrollView
                    style={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.titleInput}
                                value={editedTitle}
                                onChangeText={setEditedTitle}
                                placeholder="Title"
                                placeholderTextColor="#999"
                                selectionColor="#333"
                            />
                            <TextInput
                                style={styles.contentInput}
                                value={editedContent}
                                onChangeText={setEditedContent}
                                placeholder="Write your note here..."
                                placeholderTextColor="#999"
                                multiline
                                textAlignVertical="top"
                                selectionColor="#333"
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>{note.title}</Text>
                            <Text style={styles.content}>{note.content}</Text>
                        </>
                    )}
                </ScrollView>

                {!isEditing && (
                    <View style={styles.fabContainer}>
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => setIsEditing(true)}
                        >
                            <Ionicons name="pencil" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    headerButtonsContainer: {
        flexDirection: 'row',
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginLeft: 8,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    contentInput: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        minHeight: 300,
        padding: 4,
    },
    fabContainer: {
        position: 'absolute',
        right: 24,
        bottom: 24,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default NoteDetail;