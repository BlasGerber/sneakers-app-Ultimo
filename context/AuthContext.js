import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

    export const AuthContext = createContext()

    export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState("checking");

    useEffect(() => {
        const cargarEstadoAuth = async () => {
            const isAuthenticated = await AsyncStorage.getItem('isAuthenticated')

            if(isAuthenticated === 'true'){
                setStatus('authenticated')
            }else{
                setStatus('unauthenticated')
            }
        };
        cargarEstadoAuth()
    }, [])

    const register = async (email, password, firstName, lastName) => {

        if (!email || !password || !firstName || !lastName) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            const respuesta = await fetch('https://665683ed9f970b3b36c5aab8.mockapi.io/api/v1/users',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName
                })
            });

            if(respuesta.ok){
                alert('Registro Exitoso')
            } else {
                alert('Error al registrarse');
            }
        } catch (error) {
            console.error('Fallo el registro: ', error)
            alert('Error al registrarse')
        }
    }

    const login = async (email, password) => {

        try {
            
            const respuesta = await fetch('https://665683ed9f970b3b36c5aab8.mockapi.io/api/v1/users');
            const users = await respuesta.json()
            const user = users.find( ele=> ele.email === email && ele.password === password)
            
            console.log("User: " + user)

            if (user){
                await AsyncStorage.setItem('isAuthenticated', 'true')
                setStatus('authenticated')
            }else{
                alert("Email o contraseña incorrecta")
                setStatus('unauthenticated')
            }
            
        } catch (error) {
            alert('Error en login')
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('isAuthenticated');
        setStatus('unauthenticated')
    }

    return (
        <AuthContext.Provider value={{status, register, login, logout}}>
            { children } 
        </AuthContext.Provider>
    )
}