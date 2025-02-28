import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/Slices/PostSlice';
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

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    // Transform fetched posts into notes with colors
    const formattedNotes: Note[] = posts.map(post => ({
        id: post.id.toString(),
        title: post.title || 'Untitled',
        content: post.content || '',
        date: post.createdAt.split('T')[0], // Extract date
        color: getRandomColor(),
    }));

    // Filter notes based on search query
    const filteredNotes = formattedNotes.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to get random pastel color
    function getRandomColor() {
        const colors = ['#FFD7D7', '#D7EFFF', '#D7FFD7', '#FFFDD7', '#EFD7FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const renderNoteCard = ({ item }: { item: Note }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <Text style={styles.cardContent} numberOfLines={3}>{item.content}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Notes</Text>
                <TouchableOpacity style={styles.addButton}>
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
                <ActivityIndicator size="large" color="#6200ee" />
            ) : error ? (
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyStateText, { color: 'red' }]}>Error: {error}</Text>
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
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    addButton: { backgroundColor: '#6200ee', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, marginBottom: 16, height: 50, borderWidth: 1, borderColor: '#ddd' },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, height: 50, fontSize: 16 },
    card: { borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    cardDate: { fontSize: 12, color: '#666' },
    cardContent: { fontSize: 14, color: '#555', marginBottom: 12 },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyStateText: { marginTop: 16, fontSize: 18, color: '#999' },
});
