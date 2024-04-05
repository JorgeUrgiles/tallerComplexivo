import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import { HomeScreen } from '../screens/HomeScreen/HomeScreen'
import { styles } from '../theme/styles'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

interface Routes{
    name:string,
    screen:()=>JSX.Element
}
const Stack = createStackNavigator();
export const StackNavigator = () => {
    //HOOK PARA VER SI ESTA LOGEADO O NO
    const [isAuth, setIsAuth] = useState(false)

    //HOOK PARA  CARGA INICIAL
    const [isLoading, setIsLoading] = useState(false)
 //USE STATE PARA VALIDA EL ESTADO DE LA AUTENTICAION
    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuth(true)
            }
            setIsLoading(false);
        })
    
      
    }, [])
    //Arreglo con rutas para ususarios no Autenticados
    const routesNoAuth:Routes[]=[
        {name:"Login",screen:LoginScreen},
        {name:"Register",screen:RegisterScreen}                
    ]
    //Arreglo con rutas para usuarios Autenticados
    const routesAuth:Routes[]=[
        {name:"Home",screen:HomeScreen}
    ]
  return (
    <>
        {
            isLoading ?
            (
                <View style={styles.content}>
                    <ActivityIndicator size={50}/>
                </View>
            ):(
                <Stack.Navigator>
                    {
                        !isAuth ?
                        routesNoAuth.map((item,index)=>(
                            <Stack.Screen key={index} name={item.name} options={{headerShown:false}} component={item.screen}/>
                        ))
                        :
                        routesAuth.map((item,index)=>(
                            <Stack.Screen key={index} name={item.name} options={{headerShown:false}} component={item.screen}/>
                        ))
                    }
                </Stack.Navigator>
            )
        }
    </>
  )
}
