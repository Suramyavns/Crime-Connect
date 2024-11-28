import { Image,Text, View, Pressable, StyleSheet } from "react-native"
import { styles } from "./styles"
import { JockeyOne_400Regular, useFonts } from "@expo-google-fonts/jockey-one"

const fontStyle = StyleSheet.create({
    jockeyOne:{
        fontFamily:'JockeyOne_400Regular'
    }
})

export default function Index(){
    const [fontsLoaded]=useFonts({
        JockeyOne_400Regular
    })
    if(!fontsLoaded){
        return undefined
    }
    return(
        <View style={styles.container}>
            <Image style={{
                height:'60%'
            }} resizeMode="cover" source={require('../assets/images/supers.png')}/>
            <View style={{
                flex:1,
                flexDirection:'column',
                justifyContent:'flex-start',
                alignItems:'center'
            }}>
                <Text style={[styles.textDark,fontStyle.jockeyOne,{
                    fontSize:48,
                }]}>
                    Welcome to
                </Text>
                <Text style={[styles.textDark,fontStyle.jockeyOne,{
                    fontSize:84,
                }]}>
                    CrimeConnect
                </Text>
                <Text style={[styles.textDark,fontStyle.jockeyOne,{
                    fontSize:28,
                }]}>
                    Become responsible with your powers
                </Text>
            </View>
            <Pressable style={[{
                width:'90%',
                borderRadius:32,
                maxHeight:72,
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                margin:10
            },styles.blue]}>
                <Text style={[styles.textLight,fontStyle.jockeyOne,{
                    fontSize:32,
                }]}>Save your city</Text>
            </Pressable>
        </View>
    )
}