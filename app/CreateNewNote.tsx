import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';

export default function Tab() {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [savedNotes, setSavedNotes] = useState([]);

    const handleSaveNote = () => {
        if (title.trim() && note.trim()) {
            setSavedNotes(prevState => prevState);
            setTitle('');
            setNote('');
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
                />
            </View>

            {savedNotes.length > 0 && (
                <View style={styles.notesContainer}>
                    <Text style={styles.savedNotesHeader}>Saved Notes</Text>
                    {savedNotes.map(item => (
                        <View key={item.id} style={styles.noteItem}>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Text style={styles.noteContent}>{item.note}</Text>
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