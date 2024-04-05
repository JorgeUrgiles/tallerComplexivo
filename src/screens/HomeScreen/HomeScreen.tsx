import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { styles } from '../../theme/styles'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import firebase, { updateProfile } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { AutoCardComponent } from './components/AutoCardComponent'

interface UserForm{
  name:string
}
//interface para trabajar la data de el auto
interface Auto {
    id: string,
    to: string,
    subject: string,
    message: string
}

export const HomeScreen = () => {
      //hook usestate para controlar la visibiliad del modal
      const [showModalProfile, setShowModalProfile] = useState(false)

       //Hook usestate para controlar la visualizacion del modal de new autos que se desarrollara despues
    const [showModalAuto, setShowModalAuto] = useState(false)

  //hook para manejar los datos del usuario
  const [userForm, setUserForm] = useState<UserForm>({
    name:''
  })
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)


   //Funcion para tomar llos datos del formulario y actualizar la data
   const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value })
}

 //HOok use state para tomar la lista de autos arreglo vacio de tipo auto
 const [autos, setAutos] = useState<Auto[]>([
    { id: '1', to: 'Ariel Ron', subject: 'Complexivo', message: 'El examen es el 14 del 2024' }
])

  //Hook useEffect para capturar la data del usuario logeado
  useEffect(() => {

    setUserAuth(auth.currentUser) // datos del usuario logeado       
    setUserForm({ name: auth.currentUser?.displayName ?? '' })


}, [])

//Funcion actualiza la data del usuario, usuario logueado
const handlerUpdateUser = async () => {
    await updateProfile(userAuth!, { displayName: userForm.name })
    // console.log(userForm);
    setShowModalProfile(false)
}
    
  return (
    <>
    <View style={styles.contentHome}>
        <View style={styles.headerHome}>
            <Avatar.Text size={55} label="JU" />
            <View>
                <Text variant='bodySmall'>Bienvenido</Text>
                <Text variant='labelLarge'>{userForm.name}</Text>

            </View>
            <View style={styles.icon}>
                <IconButton

                    icon="cog"
                    size={30}
                    mode='contained'
                    onPress={() => setShowModalProfile(true)}
                />
            </View>

        </View>
     <View>
            <FlatList
                data={autos}//arreglo que vamos a recorrer
                renderItem={({ item }) => <AutoCardComponent />}
                keyExtractor={item => item.id}
            />
        </View> 


    </View>
    <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
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
            <Button mode='contained' onPress={() => handlerUpdateUser()}>Actualizar</Button>
        </Modal>
    </Portal>
    <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
    />
    {/* <NewLetterComponent visible={showModalLetter} setVisible={setShowModalLetter}/> */}
    
    </>
  )
}
