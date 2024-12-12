import { View, Text, TextInput, StyleSheet, Pressable, Dimensions, ActivityIndicator } from "react-native"
import { color, fontStyle, styles } from "./styles"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User} from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import { useNavigation,router } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthScreen(){
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [loading,toggleLoading]=useState(false);    
    const navigator = useNavigation()

    const handleSignUp = async()=>{
        toggleLoading(true);
        if(email!=='' && /\S+@\S+\.\S+/.test(email) && password!==''){
            try{
                await signInWithEmailAndPassword(auth,email,password);
                router.replace('/')
            }
            catch(error:any){
                alert(error.message)
            }
        }
        else{
            alert('Invalid credentials!')
        }
        toggleLoading(false);
    }

    const [fontsLoaded] = useFonts(fontStyle)

    if(!fontsLoaded){
        return undefined
    }

    const height = Dimensions.get('screen').height
    return(
        <View style={{
            backgroundColor:color.bg,
            height:height
        }}>
            <View style={{
                height:height*0.2,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text style={{
                    color:color.white,
                    fontSize:56,
                    fontFamily:'AudioWide'
                }}>
                    Sign In
                </Text>
            </View>
            <View style={{
                height:height*0.3,
                gap:40,
                justifyContent:'center',
                alignItems:'center'
            }}>
                {
                    loading?
                    <ActivityIndicator size={100} color={color.blue}/>
                    :
                    <>
                        <TextInput value={email} onChangeText={setEmail} placeholderTextColor={color.fontlight+'bb'} style={[authstyles.inputbox]} placeholder="Your email"/>
                        <TextInput passwordRules='Password must have 8 letters and special characters' secureTextEntry={true} value={password} onChangeText={setPassword} placeholderTextColor={color.fontlight+'bb'} style={[authstyles.inputbox]} placeholder="Protect with password"/>
                        <Pressable
                        disabled={loading}
                        onPressIn={handleSignUp}
                        style={authstyles.button}>
                            <Text style={{
                                color:color.white,
                                fontSize:24,
                                textAlign:'center',
                                fontFamily:'SansBold'
                            }}>
                                That's me
                            </Text>
                        </Pressable>   
                    </>
                }
            </View>
            <View style={{
                height:height*0.4,
                justifyContent:'flex-end',
                alignItems:'center'
            }}>
                <Pressable onPress={()=>{router.replace('/register')}} style={authstyles.button}>
                    <Text style={{
                        color:color.white,
                        fontSize:24,
                        textAlign:'center',
                        fontFamily:'SansBold'
                    }}>
                        I don't have an account
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const authstyles = StyleSheet.create({
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
        width:'85%',
        textAlign:'center',
        padding:8,
        borderRadius:12,
    }
})