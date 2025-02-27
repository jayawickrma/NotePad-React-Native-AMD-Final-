import React, { useState, useEffect } from 'react';
import { postModel } from './Model/PostModel';
import { View, StyleSheet, Button, TextInput, Text, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts } from '@/app/Slices/PostSlice';
import { RootState, AppDispatch } from "./Store/Store";

export default function Tab() {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.post);

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [savedNotes, setSavedNotes] = useState<postModel[]>([]);

    // Fetch posts when component mounts
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // Update local state when posts change in Redux store
    useEffect(() => {
        if (posts && posts.length > 0) {
            setSavedNotes(posts);
        }
    }, [posts]);

    const handleSaveNote = async () => {
        if (title.trim() && note.trim()) {
            try {
                // Create a new post object
                const newPost: postModel = {
                    title: title.trim(),
                    content: note.trim(),
                    id: Date.now(),
                    authorId: 1,
                };

                // Dispatch the createPost action
                await dispatch(createPost(newPost)).unwrap();

                // Clear form after successful save
                setTitle('');
                setNote('');

                // Show success message
                Alert.alert("Success", "Note saved successfully!");

                // Refresh the posts list (optional)
                dispatch(fetchPosts());

            } catch (err) {
                // Handle error
                console.error("Failed to save note:", err);
                Alert.alert("Error", "Failed to save note. Please try again.");
            }
        } else {
            Alert.alert("Error", "Title and content cannot be empty.");
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
                />

                <Text style={styles.label}>Content</Text>
                <TextInput
                    style={styles.input}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Enter note content..."
                    placeholderTextColor="#999"
                    multiline
                />

                <Button
                    title={loading ? "Saving..." : "Save Note"}
                    onPress={handleSaveNote}
                    color="#8a2be2"
                    disabled={loading || !title.trim() || !note.trim()}
                />

                {loading && <ActivityIndicator style={styles.loader} color="#8a2be2" />}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            {savedNotes.length > 0 && (
                <View style={styles.notesContainer}>
                    <Text style={styles.savedNotesHeader}>Saved Notes</Text>
                    {savedNotes.map((post: postModel) => (
                        <View key={post.id} style={styles.noteItem}>
                            <Text style={styles.noteTitle}>{post.title}</Text>
                            <Text style={styles.noteContent}>{post.content}</Text>
                        </View>
                    ))}
                </View>
            )}
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
    loader: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    notesContainer: {
        flex: 1,
    },
    savedNotesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    noteItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#8a2be2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    noteContent: {
        fontSize: 14,
        color: '#555',
    },
});