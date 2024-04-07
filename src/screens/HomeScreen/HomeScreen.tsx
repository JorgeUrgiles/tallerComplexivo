import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { styles } from '../../theme/styles'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, RadioButton, Text, TextInput } from 'react-native-paper'
import firebase, { getAuth, signOut, updateProfile } from 'firebase/auth'
import { auth, dbRealTime } from '../../config/firebase'
import { AutoCardComponent } from './components/AutoCardComponent'
import { NewAutoComponent } from './components/NewAutoComponent'
import { onValue, ref } from 'firebase/database'
import { useNavigation } from '@react-navigation/native'
import { LoginScreen } from '../LoginScreen'

interface UserForm{
  name:string
}
//interface para trabajar la data de el auto
export interface Auto {
    id: string,
    modelo: string,
    marca: string,
    descripcion: string
}

export const HomeScreen = () => {
    const navigation = useNavigation()
      //hook usestate para controlar la visibiliad del modal
      const [showModalProfile, setShowModalProfile] = useState(false)

       //Hook usestate para controlar la visualizacion del modal de new autos que se desarrollara despues
    const [showModalAuto, setShowModalAuto] = useState(false)

  //hook para manejar los datos del usuario
  const [userForm, setUserForm] = useState<UserForm>({
    name:''
  })
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)
 //HOok use state para tomar la lista de autos arreglo vacio de tipo auto
 const [autos, setAutos] = useState<Auto[]>([])






  //Hook useEffect para capturar la data del usuario logeado
  useEffect(() => {

    setUserAuth(auth.currentUser) // datos del usuario logeado       
    setUserForm({ name: auth.currentUser?.displayName ?? '' })
    getAllAutos()


}, [])

   //Funcion para tomar llos datos del formulario y actualizar la data
   const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value })
}


//Funcion actualiza la data del usuario, usuario logueado
const handlerUpdateUser = async () => {
    await updateProfile(userAuth!, { displayName: userForm.name })
    // console.log(userForm);
    setShowModalProfile(false)
}
const getAllAutos = () => {
    const dbRef = ref(dbRealTime, 'autos')
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val()
        const getKeys = Object.keys(data)
        const listAutos: Auto[] = []
        getKeys.forEach((key) => {
            const value = { ...data[key], id: key }
            listAutos.push(value)
        })
        setAutos(listAutos)
    })
}

const handleLogout = async () => { 
    const auth = getAuth();
   
   await signOut(auth).then(() => {

      console.log("Se cerro sesion de forma exitosa");
  
    }).catch((error) => {
   
    });
}



  return (
    <>
    <View style={styles.contentHome}>
        <View style={styles.headerHome}>
        <Avatar.Image size={74} source={require('../../assets/carro2.png')} />
            <View>
                <Text variant='bodySmall'>Bienvenido</Text>
                <Text variant='labelLarge'>{userForm.name}</Text>

            </View>
            <View style={styles.icon}>
                <IconButton
                 iconColor="#85C1E9"

                    icon="cog"
                    size={30}
                    mode='contained'
                    onPress={() => setShowModalProfile(true)}
                />
            </View>
            <View style={styles.icon}>
                <IconButton
                 iconColor="#85C1E9"

                    icon="logout"
                    size={30}
                    mode='contained'
                    onPress={handleLogout}
                />
            </View>

        </View>
     <View>
            <FlatList
                data={autos}//arreglo que vamos a recorrer
                renderItem={({ item }) => <AutoCardComponent auto={item} />}
                keyExtractor={item => item.id}
            />
        </View> 
        


    </View>
    <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
            <View style={styles.headerModal}>
                <Text variant='headlineLarge'>Mi perfil</Text>
                <IconButton icon='close' onPress={() => setShowModalProfile(false)} />
            </View>
            <Divider bold />
            <View>
                <TextInput
                    mode='outlined'
                    label='Nombre'
                    value={userForm.name}
                    onChangeText={(value) => handlerUpdateUserForm('name', value)}
                />
                <TextInput
                    mode='outlined'
                    label='Correo'
                    value={userAuth?.email!}
                    disabled
                />
            </View>
            <Button buttonColor="#85C1E9"
             mode='contained' onPress={() => handlerUpdateUser()}>Actualizar</Button>
        </Modal>
    </Portal>
    <FAB 
        rippleColor="#85C1E9"
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalAuto(true)}
    />
  <NewAutoComponent visible={showModalAuto} setVisible={setShowModalAuto}/> 
    
    </>
  )
}
