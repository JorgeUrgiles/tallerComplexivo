import React from 'react'
import { View } from 'react-native'
import { styles } from '../../../theme/styles'
import { IconButton, Text } from 'react-native-paper'
import{Auto} from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'
interface Props{
    auto: Auto
}
export const AutoCardComponent = ({auto}:Props) => {
    const navigation=useNavigation()
  return (
   <View>
    <View style={styles.contentAuto}>
        <View>
        <Text variant='labelLarge'>Modelo: {auto.modelo}</Text>
        <Text variant='bodyMedium'>Marca: {auto.marca}</Text>
        </View>
       
        <View style={styles.icon}>
            <IconButton
            icon="car"
            size={55}
            onPress={()=> navigation.dispatch(CommonActions.navigate({name:'Detail',params:{auto}}))}
            />
        </View>

    </View>
   </View>
  )
}
