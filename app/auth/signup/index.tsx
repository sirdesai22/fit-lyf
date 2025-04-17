import { supabase } from "@/lib/initSupabase";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }: any) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (!error) {
            console.log('Signup successful', data);
            router.replace('/(tabs)');
        }
        else alert(error.message);
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/solo_level_bg.png')} // your image path
            style={styles.background}
            resizeMode="cover" // or 'contain', 'stretch'
        >
            <View style={styles.container}>
                <Text style={styles.heading}>New Player</Text>
                <TextInput placeholder="Name" placeholderTextColor="#ffffff66" style={styles.input} onChangeText={setName} />
                <TextInput placeholder="Email" placeholderTextColor="#ffffff66" style={styles.input} onChangeText={setEmail} />
                <TextInput placeholder="Password" placeholderTextColor="#ffffff66" secureTextEntry style={styles.input} onChangeText={setPassword} />
                <Button onPress={handleLogin} style={styles.button}><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text></Button>
                <Button onPress={() => router.replace('/auth/login')}><Text style={{ color: '#018bf4' }}>Already have an account?</Text></Button>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#000000d1'
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#018bf4',
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#000000',
        borderColor: '#018bf4',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 12,
        color: '#fff',
        shadowColor: '#018bf4',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 15
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#018bf4',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 5,
    }
});
