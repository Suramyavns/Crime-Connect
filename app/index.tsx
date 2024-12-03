import { Image,Text, View } from "react-native"
import { styles,fontStyle } from "./styles"
import { JockeyOne_400Regular, useFonts } from "@expo-google-fonts/jockey-one"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Link, useNavigation } from "expo-router"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "@/FirebaseConfig"


export default function Index(){
    const navigator = useNavigation()
    const [user,setUser]=useState<User|null>(null)
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                // console.log('User  is signed in:', user);
                // Redirect to the main page or dashboard
                setUser(user)
            } else {
                // User is signed out
                setUser(null)
                console.log('No user is signed in');
            }
        });
        if(user){
            navigator.navigate('mainpage')
        }
    }, []);

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
                <Link push href={'/register'} style={[{
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