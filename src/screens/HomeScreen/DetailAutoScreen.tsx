import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Auto } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { dbRealTime } from '../../config/firebase'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'

export const DetailAutoScreen = () => {
    const navigation = useNavigation()
    const [detailForm, setDetailForm] = useState<Auto>({
        id: '',
        modelo: '',
        marca: '',
        descripcion: ''

    })
    //hook que  carga los datoas recibidos en el detail form
    useEffect(() => {
        setDetailForm(auto)

    }, [])


    //acceder a los parametros de navegaciion
    const route = useRoute()
    //@ts-ignore
    const { auto } = route.params
    //verificar que lo datos llegan
    // console.log(letter);
    //Funcion para actualizar la datad el formulario
    const handlerSetDetailForm = (key: string, value: string) => {
        setDetailForm({ ...detailForm, [key]: value })
    }
    //Funcion para actualizar la carta
    const handlerUpdateLetter = async () => {
        //console.log(detailForm);
        //REFERENCIA A LA BASE DE DATOS
        const dbRef = ref(dbRealTime, 'autos/' + detailForm.id)
        await update(dbRef, { marca: detailForm.marca,modelo:detailForm.modelo, descripcion: detailForm.descripcion })
        navigation.goBack()

    }
    //Funcion para eliminar la carta
    const handlerDeleteLetter = async () => {
        const dbRef = ref(dbRealTime, 'autos/' + detailForm.id)
        await remove(dbRef)
        navigation.goBack()

    }
  return (
    <View style={styles.contentDetailLetter}>
    <View style={styles.subjectLetter}>
        <Text variant='headlineSmall'>Marca:</Text>
        <TextInput
            value={detailForm.marca}
            onChangeText={(value) => handlerSetDetailForm('marca', value)}
            style={{ flex: 1 }}
        />
    </View>
    <Divider bold />
    <View style={styles.subjectLetter}>
        <Text variant='bodyLarge'>Modelo:</Text>
        <TextInput
            value={detailForm.modelo}
            onChangeText={(value) => handlerSetDetailForm('modelo', value)}
            style={{ flex: 1 }}
        />

    </View>
    <Divider bold />
    <View>
        <Text style={styles.textMessage}>Descripcion</Text>
        <TextInput
            value={detailForm.descripcion}
            multiline={true}
            numberOfLines={7}
            onChangeText={(value) => handlerSetDetailForm('descripcion', value)}

        />

    </View>
    <Button mode='contained' icon='email-sync' onPress={() => handlerUpdateLetter()}>Acutualizar</Button>

    <Button mode='contained' icon='email-remove' onPress={handlerDeleteLetter}>Eliminar</Button>
</View>
    
  )
}
