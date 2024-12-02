import { View, Text, TextInput, StyleSheet, Pressable, Dimensions } from "react-native"
import { color, fontStyle, styles } from "./styles"
import { useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function AuthScreen(){
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [confirmation,setConfirmation]=useState('');
    const [loading,toggleLoading]=useState(false);
    const auth = FIREBASE_AUTH;

    const handleSignUp = async()=>{
        toggleLoading(true);
        if(email!=='' && password!=='' && password===confirmation){
            try{
                const response = await createUserWithEmailAndPassword(auth,email,password);
                alert('Check your emails');
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

    const handleGoogle = async()=>{
        toggleLoading(true);
        setPassword('');
        setConfirmation('');
        setEmail('');
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
            }]}>Create an account</Text>
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
                <TextInput passwordRules='Password must have 8 letters and special characters' secureTextEntry={true} value={password} onChangeText={setPassword} placeholderTextColor={color.fontlight+'bb'} style={[authstyles.inputbox,fontStyle.jockeyOne]} placeholder="Protect with password"/>
                <TextInput secureTextEntry={true} value={confirmation} onChangeText={setConfirmation} placeholderTextColor={color.fontlight+'bb'} style={[authstyles.inputbox,fontStyle.jockeyOne]} placeholder="Confirm your password"/>
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
                onPressIn={handleSignUp}
                style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{
                        fontSize:28,
                        textAlignVertical:'center',
                    }]}>Become a Vigilante</Text>
                </Pressable>
                <Text style={[fontStyle.jockeyOne,styles.textDark,{
                    fontSize:28
                }]}>OR</Text>
                <Pressable onPressIn={handleGoogle} style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{fontSize:28}]}>Login</Text>
                    <MaterialIcons color={color.fontlight} name="bolt" size={24} />
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{fontSize:28}]}>with google</Text>
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