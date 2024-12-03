import { View, Text, TextInput, StyleSheet, Pressable, Dimensions } from "react-native"
import { color, fontStyle, styles } from "./styles"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signInWithEmailAndPassword, User} from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import {GoogleSignin, isSuccessResponse,User as googleUser} from '@react-native-google-signin/google-signin'
import { useNavigation } from "expo-router";

export default function AuthScreen(){
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [confirmation,setConfirmation]=useState('');
    const [loading,toggleLoading]=useState(false);    
    const navigator = useNavigation()

    const [user, setUser ] = useState<User|null>(null);

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
    }, [navigator]);

    const handleSignIn = async()=>{
        toggleLoading(true);
        if(email!=='' && password!==''){
            try{
                const response = await signInWithEmailAndPassword(auth,email,password);
                if(response.user){
                    console.log('User signed in successfully');
                    navigator.navigate('mainpage')
                }
            }
            catch(error:any){
                alert(error.message)
            }
        }
        else{
            if(password!==confirmation){
                alert('Password do not match!')
            }
            else if(email===''){
                alert('No email provided!')
            }
            else{alert('Invalid credentials!')}
        }
        toggleLoading(false);
    }

    const handleGoogle = async ()=>{
        toggleLoading(true);
        setPassword('')
        setConfirmation('')
        setEmail('')
        try{
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if(isSuccessResponse(response)){
                alert(`Welcome ${response.data.user.name}`);
            }
        }
        catch(error:any){
            console.log(error)
            alert(error.message)
        }
        toggleLoading(false);
    }

    return(
        <View style={{
            backgroundColor:color.bg,
            height:Dimensions.get('screen').height
        }}>
            <Text style={[styles.textDark,fontStyle.jockeyOne,{
                fontSize: 64,
                maxHeight:'20%',
                minHeight:'20%',
                textAlignVertical:'bottom'
            }]}>Sign In</Text>
            <View style={{
                maxHeight:'40%',
                minHeight:'40%',
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                gap:24,
            }}>
                <TextInput value={email} onChangeText={setEmail} placeholderTextColor={color.fontlight+'bb'} style={[authstyles.inputbox,fontStyle.jockeyOne]} placeholder="Your email"/>
                <TextInput passwordRules='Password must have 8 letters and special characters' secureTextEntry={true} value={password} onChangeText={setPassword} placeholderTextColor={color.fontlight+'bb'} style={[authstyles.inputbox,fontStyle.jockeyOne]} placeholder="Your password"/>
            </View>
            <View style={{
                maxHeight:'40%',
                minHeight:'40%',
                flex:1,
                justifyContent:'flex-start',
                alignItems:'center',
                flexDirection:'column',
                gap:8,
            }}>
                <Pressable
                disabled={loading}
                onPressIn={handleSignIn}
                style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{
                        fontSize:28,
                        textAlignVertical:'center',
                    }]}>Login</Text>
                </Pressable>
                <Text style={[fontStyle.jockeyOne,styles.textDark,{
                    fontSize:28
                }]}>OR</Text>
                <Pressable onPress={()=>{navigator.navigate('register')}} style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{fontSize:28}]}>
                        I don't have an account
                    </Text>
                </Pressable>
                <Pressable onPress={handleGoogle} style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{fontSize:28}]}>
                        Continue with google
                    </Text>
                </Pressable>
                <Pressable onPress={async()=>{
                    const response = await GoogleSignin.signOut();
                    console.log(response??"Signed out")
                }} style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{fontSize:28}]}>
                        SIGN OUT 
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

const authstyles = StyleSheet.create({
    inputbox:{
        minWidth:'80%',
        maxWidth:'80%',
        height:60,
        borderWidth:4,
        borderColor:color.darkborder,
        backgroundColor:color.blue,
        borderRadius:24,
        fontSize:24,
        paddingHorizontal:12,
        color:color.fontlight
    }
})