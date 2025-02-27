import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Tab() {
    // Sample user data - replace with your actual user data source
    const [user, setUser] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        bio: 'A passionate developer and tech enthusiast.',
        joinDate: '2024-11-15',
        notesCount: 27,
        profileImage: null, // This would be a URI in a real app
        theme: 'dark',
        notifications: true,
        syncEnabled: true,
        address: '1234 Main Street, City, Country',
        phoneNumber: '+1 234 567 890',
        socialLinks: {
            facebook: 'https://facebook.com/alexjohnson',
            twitter: 'https://twitter.com/alexjohnson'
        }
    });

    // Add toggle functionality for settings
    const toggleTheme = () => {
        setUser(prevUser => ({
            ...prevUser,
            theme: prevUser.theme === 'light' ? 'dark' : 'light'
        }));
    };

    const toggleNotifications = () => {
        setUser(prevUser => ({
            ...prevUser,
            notifications: !prevUser.notifications
        }));
    };

    const toggleSync = () => {
        setUser(prevUser => ({
            ...prevUser,
            syncEnabled: !prevUser.syncEnabled
        }));
    };

    // Handlers for actions
    const handleEditProfile = () => {
        // Navigation or modal logic for editing profile
        console.log('Edit profile');
    };

    const handleShareProfile = () => {
        // Share profile logic
        console.log('Share profile');
    };

    const handleHelpSupport = () => {
        // Navigate to help & support screen
        console.log('Navigate to help & support');
    };

    const handlePrivacySecurity = () => {
        // Navigate to privacy & security screen
        console.log('Navigate to privacy & security');
    };

    const handleSignOut = () => {
        // Sign out logic
        console.log('Sign out');
    };

    const formatDate = (dateString: string | number | Date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // @ts-ignore
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header with profile image and name */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileImageContainer}>
                        {user.profileImage ? (
                            <Image
                                source={{ uri: user.profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.profileImagePlaceholder}>
                                <Text style={styles.profileImageInitials}>
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </Text>
                            </View>
                        )}
                        <TouchableOpacity style={styles.editImageButton}>
                            <Ionicons name="camera" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userBio}>{user.bio}</Text>
                </View>

                {/* User stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{user.notesCount}</Text>
                        <Text style={styles.statLabel}>Notes</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{formatDate(user.joinDate)}</Text>
                        <Text style={styles.statLabel}>Member Since</Text>
                    </View>
                </View>

                {/* Action buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleEditProfile}
                    >
                        <Ionicons name="create-outline" size={22} color="#6200ee" />
                        <Text style={styles.actionButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleShareProfile}
                    >
                        <Ionicons name="share-outline" size={22} color="#6200ee" />
                        <Text style={styles.actionButtonText}>Share Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings section */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Settings</Text>

                    {/* Theme Setting */}
                    <View style={styles.settingItem}>
                        <View style={styles.settingIconContainer}>
                            <Ionicons name="moon-outline" size={22} color="#6200ee" />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Dark Mode</Text>
                            <Text style={styles.settingDescription}>
                                Change app appearance
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settingToggle}
                            onPress={toggleTheme}
                        >
                            <View style={[styles.toggleTrack, user.theme === 'dark' && styles.toggleTrackActive]}>
                                <View style={[styles.toggleThumb, user.theme === 'dark' && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Notifications Setting */}
                    <View style={styles.settingItem}>
                        <View style={styles.settingIconContainer}>
                            <Ionicons name="notifications-outline" size={22} color="#6200ee" />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Notifications</Text>
                            <Text style={styles.settingDescription}>
                                Reminders and alerts
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settingToggle}
                            onPress={toggleNotifications}
                        >
                            <View style={[styles.toggleTrack, user.notifications && styles.toggleTrackActive]}>
                                <View style={[styles.toggleThumb, user.notifications && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Cloud Sync Setting */}
                    <View style={styles.settingItem}>
                        <View style={styles.settingIconContainer}>
                            <Ionicons name="cloud-upload-outline" size={22} color="#6200ee" />
                        </View>
                        <View style={styles.settingTextContainer}>
                            <Text style={styles.settingTitle}>Cloud Sync</Text>
                            <Text style={styles.settingDescription}>
                                Sync notes across devices
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settingToggle}
                            onPress={toggleSync}
                        >
                            <View style={[styles.toggleTrack, user.syncEnabled && styles.toggleTrackActive]}>
                                <View style={[styles.toggleThumb, user.syncEnabled && styles.toggleThumbActive]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account actions */}
                <View style={styles.accountActions}>
                    <TouchableOpacity
                        style={styles.accountActionButton}
                        onPress={handleHelpSupport}
                    >
                        <Ionicons name="help-circle-outline" size={22} color="#555" />
                        <Text style={styles.accountActionText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={18} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.accountActionButton}
                        onPress={handlePrivacySecurity}
                    >
                        <Ionicons name="shield-checkmark-outline" size={22} color="#555" />
                        <Text style={styles.accountActionText}>Privacy & Security</Text>
                        <Ionicons name="chevron-forward" size={18} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={handleSignOut}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#f44336" />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Media Links */}
                <View style={[styles.socialLinksContainer, styles.cardContainer]}>
                    <Text style={styles.sectionTitle}>Social Links</Text>
                    <View style={styles.socialLinkItem}>
                        <Ionicons name="logo-facebook" size={22} color="#3b5998" />
                        <Text style={styles.socialLinkText}>{user.socialLinks.facebook}</Text>
                    </View>
                    <View style={styles.socialLinkItem}>
                        <Ionicons name="logo-twitter" size={22} color="#00acee" />
                        <Text style={styles.socialLinkText}>{user.socialLinks.twitter}</Text>
                    </View>
                </View>

                {/* Address & Phone */}
                <View style={[styles.contactContainer, styles.cardContainer]}>
                    <Text style={styles.sectionTitle}>Contact Info</Text>
                    <Text style={styles.contactText}>Address: {user.address}</Text>
                    <Text style={styles.contactText}>Phone: {user.phoneNumber}</Text>
                </View>

                <Text style={styles.versionText}>Notes App v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageInitials: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#6200ee',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    userBio: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#ddd',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 16,
        paddingHorizontal: 16,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    actionButtonText: {
        fontSize: 14,
        color: '#6200ee',
        fontWeight: '500',
        marginLeft: 8,
    },
    settingsSection: {
        backgroundColor: '#fff',
        marginTop: 24,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    settingDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    settingToggle: {
        marginLeft: 8,
    },
    toggleTrack: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleTrackActive: {
        backgroundColor: '#b388ff',
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    accountActions: {
        marginTop: 24,
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    accountActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    accountActionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 12,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    signOutText: {
        fontSize: 16,
        color: '#f44336',
        marginLeft: 12,
    },
    cardContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    socialLinksContainer: {
        marginTop: 24,
    },
    socialLinkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 4,
    },
    socialLinkText: {
        fontSize: 14,
        marginLeft: 12,
        color: '#555',
    },
    contactContainer: {
        marginTop: 24,
    },
    contactText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        paddingVertical: 4,
    },
    versionText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginTop: 32,
    },
});