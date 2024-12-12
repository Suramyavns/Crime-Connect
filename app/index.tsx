import { Dimensions, Image,Text, View } from "react-native"
import { styles, color, fontStyle } from "./styles"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Link, useNavigation,router } from "expo-router"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "@/FirebaseConfig"
import { useFonts } from "expo-font"

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
            router.replace('/(main)')
        }
    }, []);

    const [fontsLoaded] = useFonts(fontStyle)

    if(!fontsLoaded){
        return undefined
    }

    const height = Dimensions.get('screen').height
    return(
        <SafeAreaProvider>
            <View style={styles.main}>
                <View style={{
                    height:height*2/8,
                    alignItems:'center',
                    justifyContent:'flex-start'
                }}>
                    <Text style={{
                        fontFamily:'AudioWide',
                        fontSize:56,
                        color:color.white
                    }}>
                        Crime Connect
                    </Text>
                    <Text style={{
                        fontSize:20,
                        fontFamily:'AudioWide',
                        color:color.white
                    }}>
                        Become responsible with your powers
                    </Text>
                </View>
                <View style={{height:height*4/8,justifyContent:'flex-end'}}>
                    <Link replace href={'/register'} style={{
                        backgroundColor:color.blue,
                        minWidth:'85%',
                        textAlign:'center',
                        padding:8,
                        borderRadius:12
                    }}>
                        <Text style={{
                            textAlignVertical:'center',
                            color:color.white,
                            fontSize:24,
                            fontFamily:'SansBold'
                        }}>
                            Save your city
                        </Text>
                    </Link>
                </View>
            </View>
        </SafeAreaProvider>
    )
}