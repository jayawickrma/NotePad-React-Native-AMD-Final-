import React, { useState } from 'react';
import { postModel } from '@/Model/PostModel';
import { View, StyleSheet, Button, TextInput, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { createPost } from '@/Slices/PostSlice';
import { AppDispatch } from "@/Store/Store";

export default function Tab() {
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearForm = () => {
        setTitle('');
        setNote('');
    };

    const handleSaveNote = async () => {
        if (title.trim() && note.trim()) {
            setIsSubmitting(true);
            try {

                const newPost: postModel = {
                    title: title.trim(),
                    content: note.trim(),
                    createdAt: "",
                    id: Date.now(),
                    authorId: 1,
                };


                await dispatch(createPost(newPost)).unwrap();


                clearForm();


                Alert.alert(
                    "Success",
                    "Note saved successfully!",
                    [{ text: "OK" }]
                );

            } catch (err) {

                console.error("Failed to save note:", err);
                Alert.alert(
                    "Error",
                    "Failed to save note. Please try again.",
                    [{ text: "OK" }]
                );
            } finally {
                setIsSubmitting(false);
            }
        } else {
            Alert.alert(
                "Error",
                "Title and content cannot be empty.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Note</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.title}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title..."
                    placeholderTextColor="#999"
                    editable={!isSubmitting}
                />

                <Text style={styles.label}>Content</Text>
                <TextInput
                    style={styles.input}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Enter note content..."
                    placeholderTextColor="#999"
                    multiline
                    editable={!isSubmitting}
                />

                <View style={styles.buttonContainer}>
                    <Button
                        title={isSubmitting ? "Saving..." : "Save Note"}
                        onPress={handleSaveNote}
                        color="#8a2be2"
                        disabled={isSubmitting || !title.trim() || !note.trim()}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff8fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 6,
        color: '#333',
    },
    title: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    input: {
        width: '100%',
        height: 120,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 10,
    }
});