import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';

interface LoginForm{
    email:string,
    password:string
}
interface MessageSnackbar{
    visible:boolean,
    mensaje:string,
    color:string
}

export const LoginScreen = () => {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email:"",
        password:""
    })

    const [messageSnackbar, setMessageSnackbar] = useState<MessageSnackbar>({
        visible:false,
        mensaje:"",
        color:"#fff"

    })
      //Funcion para actualizar los valores del ususario
const handlerSetLoginForm=(key:string, value:string)=>{
    setLoginForm({... loginForm,[key]:value})

    };
    //Funcion para tomar los valores del registro
const handlerLogin = async() => {
    if(!loginForm.email|| !loginForm.password){
        //cambiar el estado para visualizar el mensaje
        setMessageSnackbar({
            visible:true,
            mensaje:"Complete todos los campos",
            color:"#964891"
        })
        return;

    }
    //Registrar el nombre
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
            visible:true,
            mensaje:"No se pudo realizar el registro",
            color:"#964891"
        })
        
    }
}
  return (
    <View style={styles.content}>
    <Text variant='headlineMedium'>Login</Text>
    <TextInput
        mode='outlined'
        label='Correo'
        placeholder='Escribe tu correo'
        style={styles.inputs}
        onChangeText={(value)=>handlerSetLoginForm('email',value)}
    />

    <TextInput
        mode='outlined'
        label='Contraseña'
        placeholder='Escribe tu contraseña'
        secureTextEntry
        style={styles.inputs}
        onChangeText={(value)=>handlerSetLoginForm('password',value)}
    />
    <Button mode='contained'
    onPress={()=>handlerLogin()}
    style={styles.btn}
    >Iniciar sesion</Button>
    <Snackbar
    visible={messageSnackbar.visible}
    onDismiss={()=> setMessageSnackbar({...messageSnackbar, visible:false})}
    style={{backgroundColor:messageSnackbar.color}}
    >{messageSnackbar.mensaje}</Snackbar>
</View>
  )
}
