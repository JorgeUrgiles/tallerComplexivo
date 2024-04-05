import React from 'react'
import { View } from 'react-native'
import { styles } from '../../../theme/styles'
import { IconButton, Text } from 'react-native-paper'

export const AutoCardComponent = () => {
  return (
   <View>
    <View style={styles.contentAuto}>
        <Text variant='labelLarge'>Modelo: Skyline</Text>
        <Text variant='bodyMedium'>Marca: Nissan</Text>
        <View style={styles.icon}>
            <IconButton
            icon="email-alert"
            size={25}
            onPress={()=> console.log("Pressed")}
            />
        </View>

    </View>
   </View>
  )
}
