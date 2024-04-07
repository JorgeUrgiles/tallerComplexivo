import React, { useState } from 'react'
import { Image, View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';
import { CommonActions, useNavigation } from '@react-navigation/native'

interface LoginForm {
    email: string,
    password: string
}
interface MessageSnackbar {
    visible: boolean,
    mensaje: string,
    color: string
}

export const LoginScreen = () => {
    const imagen = require('../assets/log.png')
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: ""
    })

    const [messageSnackbar, setMessageSnackbar] = useState<MessageSnackbar>({
        visible: false,
        mensaje: "",
        color: "#fff"

    })
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const navigation = useNavigation();

    //Funcion para actualizar los valores del ususario
    const handlerSetLoginForm = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value })

    };
    //Funcion para tomar los valores del registro
    const handlerLogin = async () => {
        if (!loginForm.email || !loginForm.password) {
            //cambiar el estado para visualizar el mensaje
            setMessageSnackbar({
                visible: true,
                mensaje: "Complete todos los campos",
                color: "#85C1E9"
            })
            return;

        }
        
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                loginForm.email,
                loginForm.password
            );
            console.log(response);


        } catch (e) {
            console.log(e)
            setMessageSnackbar({
                visible: true,
                mensaje: "No se pudo realizar el registro",
                color: "#85C1E9"
            })

        }
    }
    return (
        <View style={styles.content}>
            <Image style={{ width: 300, height: 200,resizeMode: 'contain' }} 
            source={imagen}
            />
            <Text variant='headlineMedium'>CARWISH</Text>
            <Text variant='headlineMedium'>Crea tu lista de vehicuklos soñados!</Text>
            <Text variant='headlineMedium'>Login</Text>
            <TextInput
                mode='outlined'
                label='Correo'
                placeholder='Escribe tu correo'
                style={styles.inputs}
                onChangeText={(value) => handlerSetLoginForm('email', value)}
            />

            <TextInput
                mode='outlined'
                label='Contraseña'
                placeholder='Escribe tu contraseña'
                secureTextEntry
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
                style={styles.inputs}
                onChangeText={(value) => handlerSetLoginForm('password', value)}
            />
            <Button mode='contained'
                buttonColor="#85C1E9"
                onPress={() => handlerLogin()}
                style={styles.btn}
            >Iniciar sesion</Button>
            <Snackbar
                visible={messageSnackbar.visible}
                onDismiss={() => setMessageSnackbar({ ...messageSnackbar, visible: false })}
                style={{ backgroundColor: messageSnackbar.color }}
            >{messageSnackbar.mensaje}</Snackbar>
            <Text
                style={styles.textNavigation}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name:'Register' }))}
            >No tienes cuenta? Crea una cuenta ahora!
            </Text>
        </View>
    )
}
