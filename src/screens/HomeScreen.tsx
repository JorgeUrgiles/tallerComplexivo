import React from 'react'
import { View } from 'react-native'
import { styles } from '../theme/styles'
import { Avatar, Text } from 'react-native-paper'

export const HomeScreen = () => {
  return (
    <View style={styles.contentHome}>
        <Avatar.Text size={55} label='JU'/>
        <View>
            <Text variant='bodySmall'>Bienvenido</Text>
            <Text variant='labelLarge'>Bienvenido</Text>

        </View>
        
    </View>
  )
}
