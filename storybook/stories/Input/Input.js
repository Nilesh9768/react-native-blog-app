import { TextInput, View, StyleSheet } from 'react-native'

export default function Input({ placeholder = '', type = 'default', isPassword = false }) {


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={type}
                secureTextEntry={isPassword}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: 300,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    input: {
        fontSize: 18
    }
})