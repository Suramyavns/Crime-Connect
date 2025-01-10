import HeaderComponent from "@/app/components/Header";
import { color, fontStyle } from "@/app/styles/common";
import { useFonts } from "expo-font";
import { useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

export default function SOSPage(){
    const [pressing,togglePress] = useState<boolean>(false)
    const [fontloaded] = useFonts(fontStyle);
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    return(
        <View style={{
            height:'100%',
            paddingVertical:18,
            backgroundColor:color.bg
        }}>
            <HeaderComponent title={"Emergency"} />
            <View style={{
                height:'80%',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Pressable onPressOut={()=>{togglePress(false)}} onPressIn={()=>{togglePress(true)}} style={{
                    height:height*.3,
                    borderWidth:1,
                    borderRadius:'100%',
                    borderColor:'#39a6e1',
                    alignItems:'center',
                    justifyContent:'center',
                    padding:56,
                    backgroundColor:pressing?'#39a6e1':color.black
                }}>
                    <Text style={{
                        fontSize:72,
                        fontFamily:'AudioWide',
                        color:pressing?color.black:color.white,
                    }}>
                        SOS
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}