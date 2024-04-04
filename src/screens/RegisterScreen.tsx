import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';
import { CommonActions, useNavigation } from '@react-navigation/native'

interface RegisterForm{
    email:string,
    password:string
}
interface MessageSnackbar{
    visible:boolean,
    mensaje:string,
    color:string
}
export const RegisterScreen = () => {
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        email:"",
        password:""
    })

    const [messageSnackbar, setMessageSnackbar] = useState<MessageSnackbar>({
        visible:false,
        mensaje:"",
        color:"#fff"

    })

    const [hiddenPassword, setHiddenPassword] = useState(true)
    const navigation=useNavigation();



    //Funcion para actualizar los valores del ususario
const handlerSetRegisterForm=(key:string, value:string)=>{
    setRegisterForm({... registerForm,[key]:value})

    };
    //Funcion para tomar los valores del registro
const handlerRegister = async() => {
    if(!registerForm.email|| !registerForm.password){
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
        const response = await createUserWithEmailAndPassword(
            auth,
            registerForm.email,
            registerForm.password
        );
        setMessageSnackbar({
            visible:true,
            mensaje:"Registro exitoso",
            color:"#246317"
        })
        
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
            <Text variant='headlineMedium'>Registrate</Text>
            <TextInput
                mode='outlined'
                label='Correo'
                placeholder='Escribe tu correo'
                style={styles.inputs}
                onChangeText={(value)=>handlerSetRegisterForm('email',value)}
            />

            <TextInput
                mode='outlined'
                label='Contraseña'
                placeholder='Escribe tu contraseña'
                secureTextEntry
                right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
                style={styles.inputs}
                onChangeText={(value)=>handlerSetRegisterForm('password',value)}
            />
            <Button mode='contained'
            onPress={()=>handlerRegister()}
            style={styles.btn}
            >Registrar</Button>
            <Snackbar
            visible={messageSnackbar.visible}
            onDismiss={()=> setMessageSnackbar({...messageSnackbar, visible:false})}
            style={{backgroundColor:messageSnackbar.color}}
            >{messageSnackbar.mensaje}</Snackbar>
            <Text
            onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}
            >
                Ya tienes cuenta? Inicia Sesion!
            </Text>
        </View>
    )
}
