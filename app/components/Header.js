import { Dimensions } from "react-native";
import { StyleSheet,Text,View } from "react-native";
import ProfilePicture from "./Pfp";
import { color, fontStyle } from "../styles/common";
import { useFonts } from "expo-font";

export default function HeaderComponent({title}){
    const [fontsloaded]=useFonts(fontStyle);
    return(
        <View style={headerStyle.heading}>
            <ProfilePicture />
            <Text style={{
                fontSize:48,
                fontFamily:'AudioWide',
                color:color.fontlight
            }}>{title}</Text>
        </View>
    )
}

const headerStyle = StyleSheet.create({
    heading:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height*.1
    }
})