
import { Dimensions, StyleSheet } from "react-native"

export const color = {
    'bg':'#272727',
    'fontdark':'#272727',
    'fontlight':'#efefef',
    'white':'#efefef',
    'blue':'#386394',
    'black':'#272727',
    'darkborder':'#4a5575',
    'red':'#d94545'
}

export const fontStyle = {
    'AudioWide':require('../../assets/fonts/Audiowide/Audiowide-Regular.ttf'),
    'Sans':require('../../assets/fonts/Manrope/static/Manrope-Medium.ttf'),
    'SansBold':require('../../assets/fonts/Manrope/static/Manrope-Bold.ttf')
}

export const styles = StyleSheet.create({
    main:{
        padding:12,
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-between',
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
    inputbox:{
        width:Dimensions.get('screen').width*0.85,
        borderRadius:12,
        borderWidth:1,
        borderColor:color.blue,
        height:57,
        paddingHorizontal:12,
        fontSize:20,
        fontFamily:'Sans',
        color:color.white
    },
    button:{
        backgroundColor:color.blue,
        width:Dimensions.get('screen').width*.85,
        textAlign:'center',
        padding:8,
        borderRadius:12,
    }
})