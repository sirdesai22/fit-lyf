import { supabase } from "@/lib/initSupabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";

export default function SignupScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let isValid = true;
        
        if (!name) {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError(null);
        }

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError(null);
        }

        return isValid;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    }
                }
            });

            if (error) {
                setError(error.message);
            } else {
            router.replace('/(tabs)');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
            <View style={styles.container}>
                <Text style={styles.heading}>New Player</Text>
            
            <TextInput
                placeholder="Name"
                placeholderTextColor="#ffffff66"
                textColor="#fff"
                style={styles.input}
                onChangeText={(text) => {
                    setName(text);
                    setNameError(null);
                }}
                error={!!nameError}
                disabled={loading}
            />
            {nameError && <HelperText type="error">{nameError}</HelperText>}

            <TextInput
                placeholder="Email"
                placeholderTextColor="#ffffff66"
                textColor="#fff"
                style={styles.input}
                onChangeText={(text) => {
                    setEmail(text);
                    setEmailError(null);
                }}
                error={!!emailError}
                disabled={loading}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            {emailError && <HelperText type="error">{emailError}</HelperText>}

            <TextInput
                placeholder="Password"
                placeholderTextColor="#ffffff66"
                textColor="#fff"
                secureTextEntry
                style={styles.input}
                onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(null);
                }}
                error={!!passwordError}
                disabled={loading}
            />
            {passwordError && <HelperText type="error">{passwordError}</HelperText>}

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <Button 
                onPress={handleSignup} 
                style={styles.button}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                        Sign Up
                    </Text>
                )}
            </Button>

            <Button 
                onPress={() => router.replace('/auth/login')}
                disabled={loading}
            >
                <Text style={{ color: '#018bf4' }}>
                    Already have an account?
                </Text>
            </Button>
            </View>
    );
}

const styles = StyleSheet.create({
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
        color: '#fff',
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#000000',
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
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 5,
    },
    errorText: {
        color: '#ff4444',
        marginBottom: 10,
        textAlign: 'center',
    }
});
