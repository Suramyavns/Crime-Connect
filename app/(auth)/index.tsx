import { ActivityIndicator, Dimensions, Image,Text, View } from "react-native"
import { styles, color, fontStyle } from "../styles/common"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Link, useNavigation,router } from "expo-router"
import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import {auth} from '../../Appwrite'

export default function Index(){
    const [loading,setLoading]=useState(false)

    const checkUser = async() => {
        try{
            const user = await auth.get();
            if(user){
                router.replace('/(main)')
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        setLoading(true)
        checkUser()
    }, []);

    const [fontsLoaded] = useFonts(fontStyle)

    const height = Dimensions.get('screen').height
    return(
        <SafeAreaProvider>
            <View style={styles.main}>
            {
                loading?
                <ActivityIndicator size={150} color={color.blue} />
                :
                <>
                <View style={{
                    height:height*1/8,
                    paddingVertical:12,
                    alignItems:'center',
                    justifyContent:'center'
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
                </>
            }
            </View>
        </SafeAreaProvider>
    )
}