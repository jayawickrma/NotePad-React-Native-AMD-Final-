import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts, getAllPosts} from '@/Slices/PostSlice';
import { RootState, AppDispatch } from "@/Store/Store";

// Define the Note type
interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
    color: string;
}

export default function Tab() {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.post);

    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

    // Fetch all posts when component mounts
    // @ts-ignore
    useEffect(() => {
        dispatch(fetchPosts())
    }, []);

    // Convert posts to notes format when posts change
    useEffect(() => {
        if (posts && posts.length > 0) {
            const formattedNotes: Note[] = posts.map(post => ({
                id: post.id.toString(),
                title: post.title || 'Untitled',
                content: post.content || '',
                date: new Date().toString().split('T')[0], // Today's date as fallback
                color: getRandomColor(),
            }));
            setNotes(formattedNotes);
        }
    }, [posts]);

    // Function to fetch all posts
    const fetchAllPosts = async () => {
        try {
            await dispatch(getAllPosts());
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        }
    };

    // Function to get random pastel color
    const getRandomColor = () => {
        const colors = ['#FFD7D7', '#D7EFFF', '#D7FFD7', '#FFFDD7', '#EFD7FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        if (searchQuery) {
            const filtered = notes.filter(
                (note) =>
                    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    note.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(notes);
        }
    }, [searchQuery, notes]);

    const renderNoteCard = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => console.log('View note details', item.id)}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <Text style={styles.cardContent} numberOfLines={3}>{item.content}</Text>

            <View style={styles.cardFooter}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => console.log('Edit note', item.id)}
                >
                    <Ionicons name="pencil-outline" size={18} color="#555" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => console.log('Delete note', item.id)}
                >
                    <Ionicons name="trash-outline" size={18} color="#555" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Notes</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => console.log('Add new note')}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#777" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#777" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {loading ? (
                <View style={styles.emptyState}>
                    <Text>Loading notes...</Text>
                </View>
            ) : error ? (
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyStateText, { color: 'red' }]}>
                        Error loading notes: {error}
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchAllPosts}>
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : filteredNotes.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="document-text-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyStateText}>No notes found</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredNotes}
                    renderItem={renderNoteCard}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    refreshing={loading}
                    onRefresh={fetchAllPosts}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // ... existing styles
    retryButton: {
        marginTop: 16,
        backgroundColor: '#6200ee',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // Keep all other existing styles
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#6200ee',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    cardDate: {
        fontSize: 12,
        color: '#666',
    },
    cardContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        marginTop: 16,
        fontSize: 18,
        color: '#999',
    },
});