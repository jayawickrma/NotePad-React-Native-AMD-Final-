import React, { useState, useEffect } from 'react';
import { postModel } from '@/Model/PostModel';
import { View, StyleSheet, Button, TextInput, Text, Alert, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts } from '@/Slices/PostSlice';
import { RootState, AppDispatch } from "@/Store/Store";

export default function Tab() {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.post);

    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [savedNotes, setSavedNotes] = useState<postModel[]>([]);
    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false); // State for loading modal
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // State for success modal

    // Update local state when posts change in Redux store
    useEffect(() => {
        if (posts && posts.length > 0) {
            setSavedNotes(posts);
        }
    }, [posts]);

    const handleSaveNote = async () => {
        if (title.trim() && note.trim()) {
            try {
                // Show loading modal
                setIsLoadingModalVisible(true);

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

                // Hide loading modal and show success modal
                setIsLoadingModalVisible(false);
                setIsSuccessModalVisible(true);

            } catch (err) {
                // Handle error
                console.error("Failed to save note:", err);
                setIsLoadingModalVisible(false); // Hide loading modal
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
                    title="Save Note"
                    onPress={handleSaveNote}
                    color="#8a2be2"
                    disabled={loading || !title.trim() || !note.trim()}
                />
            </View>

            {/* Loading Modal */}
            <Modal
                visible={isLoadingModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#8a2be2" />
                        <Text style={styles.modalText}>Saving Note...</Text>
                    </View>
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal
                visible={isSuccessModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Note saved successfully!</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsSuccessModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#8a2be2',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});