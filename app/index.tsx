import { Image,Text, View, Pressable, StyleSheet } from "react-native"
import { styles,fontStyle } from "./styles"
import { JockeyOne_400Regular, useFonts } from "@expo-google-fonts/jockey-one"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { useEffect } from "react"
import { GoogleSignin } from "react-native-google-signin"

export default function Index(){
    const [fontsLoaded]=useFonts({
        JockeyOne_400Regular
    })
    if(!fontsLoaded){
        return undefined
    }
    return(
        <SafeAreaProvider>
            <View style={styles.main}>
                <Image style={{
                    height:'60%'
                }} source={require('../assets/images/batman.png')}/>
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
                <Link push href='/auth' style={[{
                    width:'90%',
                    borderRadius:32,
                    maxHeight:64,
                    minHeight:64,
                    textAlignVertical:'center',
                    margin:16
                },styles.blue]}>
                    <Text style={[styles.textLight,fontStyle.jockeyOne,{
                        fontSize:32,
                    }]}>Save your city</Text>
                </Link>
            </View>
        </SafeAreaProvider>
    )
}