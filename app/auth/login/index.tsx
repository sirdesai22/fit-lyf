import { supabase } from "@/lib/initSupabase";
import axios from "axios";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import {GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin'

export default function LoginScreen({ navigation }: any) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
            //call backend route to add user data
            // const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/add`, { email });
            // console.log('Login successful', data);
            router.replace('/(tabs)');
        }
        else alert(error.message);
    };

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.data.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: userInfo.data.idToken,
                });
                console.log(error, data);
            } else {
                throw new Error('no ID token present!');
            }
        } catch (error: any) {
            console.log(error);
        }
    };
    
    if (supabase.auth.user()) {
        return <Redirect href="/(tabs)" />;
    }

    return (
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>
                <TextInput placeholder="Email" placeholderTextColor="#ffffff66" textColor="#fff" style={styles.input} onChangeText={setEmail} />
                <TextInput placeholder="Password" placeholderTextColor="#ffffff66" textColor="#fff" secureTextEntry style={styles.input} onChangeText={setPassword} />
                <Button onPress={handleLogin} style={styles.button}><Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Login</Text></Button>
                <Button onPress={() => router.replace('/auth/signup')}><Text style={{ color: '#018bf4' }}>Don't have an account?</Text></Button>

                {/* <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={async () => {
                        try {
                        await GoogleSignin.hasPlayServices()
                        const userInfo = await GoogleSignin.signIn()
                        if (userInfo.data.idToken) {
                            const { data, error } = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.data.idToken,
                            })
                            console.log(error, data)
                        } else {
                            throw new Error('no ID token present!')
                        }
                        } catch (error: any) {
                        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                            // user cancelled the login flow
                        } else if (error.code === statusCodes.IN_PROGRESS) {
                            // operation (e.g. sign in) is in progress already
                        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                            // play services not available or outdated
                        } else {
                            // some other error happened
                        }
                        }
                    }}
                    /> */}
            </View>
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
        backgroundColor: '#000000'
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        // color: '#018bf4',
        color: '#fff',
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#000000',
        // borderColor: '#018bf4',
        borderColor: '#fff',
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
        // backgroundColor: '#018bf4',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 5,
    }
});
