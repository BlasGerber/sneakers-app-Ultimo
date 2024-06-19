import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {

    const { status, login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        await login(email, password)
        if (status === 'authenticated') {
            navigation.navigate('Home');
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            navigation.navigate("Home");
        }
    }, [status, navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
          
            <TextInput 
                style={styles.input}
                placeholder='Ingrese su Email'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input}
                placeholder='Ingrese su Contraseña'
                value={password}
                onChangeText={setPassword}
            />
            <Button title='Iniciar sesión' onPress={handleLogin}/>
            <Text style={styles.orText}>Si aun no estas regristado</Text>
            <Button title='Registrarse' onPress={() => navigation.navigate('Register')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    orText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
});