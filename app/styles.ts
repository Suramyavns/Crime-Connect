
import { StyleSheet } from "react-native"

export const color = {
    'bg':'#272727',
    'fontdark':'#272727',
    'fontlight':'#efefef',
    'white':'#efefef',
    'blue':'#1d677f',
    'black':'#272727',
    'darkborder':'#4a5575'
}

export const fontStyle = StyleSheet.create({
    jockeyOne:{
        fontFamily:'JockeyOne_400Regular'
    }
})

export const styles = StyleSheet.create({
    main:{
        padding:1,
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:color.bg
    },
    textLight:{
        textAlign:'center',
        color:color.fontlight,
    },
    textDark:{
        textAlign:'center',
        color:color.fontdark,
    },
    blue:{
        backgroundColor:color.blue
    },
    black:{
        backgroundColor:color.black
    },
    light:{
        borderColor:color.black,
        borderWidth:2,
        borderStyle:'solid'
    },
    btn:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:1,
        maxHeight:48,
        minHeight:48,
        margin:4,
        minWidth:'75%',
        paddingHorizontal:12,
        height:'auto',
        borderRadius:12,
        paddingVertical:8,
    },
    textInput:{
        borderRadius:12,
        paddingHorizontal:12,
        minWidth:'85%'
    }
})