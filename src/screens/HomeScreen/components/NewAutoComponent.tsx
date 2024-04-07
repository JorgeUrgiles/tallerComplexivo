import React, { useState } from 'react'
import { dbRealTime } from '../../../config/firebase'
import { push, ref, set } from 'firebase/database'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { View } from 'react-native'
import { styles } from '../../../theme/styles'


//interface que indica los porps que  este componente va a majenar
interface Props{
    visible:boolean,
    setVisible:Function
}
interface AutoForm{
  modelo:string,
  marca:string,
  descripcion:string
}

export const NewAutoComponent = ({visible,setVisible}:Props) => {
     //hoock para actualizar los datos de nuestro formulario
  const [autoForm, setAutoForm] = useState<AutoForm>({
    modelo:'',
    marca:'',
    descripcion:''
  })
  //funcion para capturar y actualizar los valores del formulario
  const handlerSetAutoForm=(key:string, value:string)=>{
    setAutoForm({...autoForm, [key]:value})

  }
  //Funcion para guardar las cartas
  const handlerSaveAuto=async()=>{
    if(!autoForm.modelo||!autoForm.marca||!autoForm.descripcion){
      return

    }
    //console.log(letterForm)
    const dbRef=ref(dbRealTime, 'autos')
    const saveAuto=push(dbRef)//ubicacion de almacenamiento
    try {
      await set(saveAuto,autoForm)
      //Limoiar los valores del formulario
      setAutoForm({
        modelo:'',
        marca:'',
        descripcion:''
        
      
      })
      
    } catch (e) {
      console.log(e)
      
    }
    setVisible(false)
  }
  return (
   
    <Portal>
        <Modal visible={visible} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
          <Text variant='headlineMedium'>Nueva Carta</Text>
          <IconButton icon='close' onPress={()=>setVisible(false)}/>
          </View>
          <Divider bold/>
          <TextInput
          label='Modelo'
          mode='outlined'
          onChangeText={(value)=>handlerSetAutoForm('modelo',value)}
          />
           <TextInput
          label='Marca'
          mode='outlined'
          onChangeText={(value)=>handlerSetAutoForm('marca',value)}
          />
           <TextInput
          label='Descripcion'
          mode='outlined'
          onChangeText={(value)=>handlerSetAutoForm('descripcion',value)}
          multiline={true}
          numberOfLines={7}
          />
          <Button buttonColor="#85C1E9" style={{marginTop:20}} mode='contained' onPress={()=>handlerSaveAuto()}>Guardar</Button>
          </Modal>
        
      </Portal>
  )
}
