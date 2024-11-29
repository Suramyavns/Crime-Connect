import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native"
import { color, fontStyle, styles } from "./styles"
import { useState } from "react"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
export default function AuthScreen(){
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [confirmation,setConfirmation]=useState('')
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
                <Pressable style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{
                        fontSize:28,
                        textAlignVertical:'center',
                    }]}>Become a vigilante</Text>
                </Pressable>
                <Text style={[fontStyle.jockeyOne,styles.textDark,{
                    fontSize:28
                }]}>OR</Text>
                <Pressable style={[styles.btn,{
                    backgroundColor:color.black,
                }]}>
                    <Text style={[fontStyle.jockeyOne,styles.textLight,{
                        fontSize:28,
                        textAlignVertical:'center',
                        flex:1,
                        width:'100%',
                        alignItems:'center',
                        flexDirection:'row',
                        justifyContent:'center',
                    }]}>
                        Login
                        <MaterialIcons name="bolt" size={28}  />
                        with Google
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