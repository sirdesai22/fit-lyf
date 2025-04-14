import { supabase } from "@/lib/initSupabase";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }: any) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (!error) {
            console.log('Login successful', data);
            router.replace('/(tabs)');
        }
        else alert(error.message);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Signin</Text>
            <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
            <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />
            <Button onPress={handleLogin} style={styles.button}><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text></Button>
            <Button onPress={() => router.replace('/auth/login')}><Text style={{ color: 'cyan' }}>Already have an account?</Text></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#121212'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '100%',
        marginBottom: 10
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1CAC78',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 5,
    }
});
