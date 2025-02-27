import {View, StyleSheet, Button} from 'react-native';

export default function Tab() {
    return (
        <View style={styles.container}>

            <Button title={"Create new Note"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
