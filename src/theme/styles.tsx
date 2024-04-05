import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({

    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        gap:10
        
    },
    inputs:{
        width:"90%"
    },
    btn:{
        marginTop:10,
        width:"20%"
    },
    textNavigation:{
        marginTop:20,
        fontSize:15,
        color:"#333",
        fontWeight:'bold',
        
    },
    contentHome:{
        flex:1,
        marginVertical:50,
        marginHorizontal:20,

    },
    headerHome:{
        flexDirection:'row',
        gap:15,
        alignItems:'center'
    },
    icon:{
        flex:1,
        alignItems:'flex-end'                                                                                                                                                                                                                                                                    
    },
    modalProfile:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#fff',
        marginHorizontal:20,
        borderRadius:10,
    },
    headerModal:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    contentAuto:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:30,
        alignItems:'center',
    
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})