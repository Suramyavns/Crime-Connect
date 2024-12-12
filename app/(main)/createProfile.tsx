import { auth } from "@/FirebaseConfig";
import { useNavigation,router } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, TextInput, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { color, fontStyle, styles } from "../styles";
import { useFonts } from "expo-font";
import DateInput from "../components/DatePicker";
import PhoneNumberInput from '../components/PhoneNumberInput'
import {Ionicons} from '@expo/vector-icons'
import { createUserProfile } from "../utils/crud_user";
import {ICountry} from 'react-native-international-phone-number'
import {default_credibility} from '../utils/credibility'

interface Warnings{
    username:boolean,
    phone:boolean,
    fpronoun:boolean,
    spronoun:boolean
}

export default function ProfileCreation(){
    const [date,setDate]=useState(new Date())
    const [showDate,setShowDate]=useState(false);
    const [fpronoun,setFPronoun]=useState<string>()
    const [spronoun,setSPronoun]=useState<string>()
    const [phone,setPhone]=useState<string>();
    const [country,setCountry]=useState<ICountry>()
    const [username,setUsername] = useState<string>()
    const [loading,toggleLoading]=useState(false)
    const [existingUser,setExistingUser]=useState<User|null>()
    const [warning,setWarning]=useState<Warnings>({
        username:false,
        fpronoun:false,
        phone:false,
        spronoun:false
    })
    const [valid,setValid]=useState(true)

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                // [WIP]
                setExistingUser(auth.currentUser)
            }
            else{
                router.replace('/')
            }
        })
    })

    const validateForm = async() =>{
        const newWarning = {
            username:!Boolean(username?.length),
            phone:!Boolean(phone?.length),
            fpronoun:!Boolean(fpronoun),
            spronoun:!Boolean(spronoun)
        }
        setWarning(newWarning);
        return !Object.values(newWarning).some(item=>item===true)
    }

    const handleSubmit = async() => {
        if(!(await validateForm())){
            return;
        }
        toggleLoading(true);
        try{
            await createUserProfile(existingUser?.uid,{
                'username':username,
                'phone':phone,
                'credibility':default_credibility,
                'email':existingUser?.email,
                'fpronoun':fpronoun,
                'spronoun':spronoun,
                'dob':date,
                'country':country?.callingCode
            })
            router.replace('/(main)')
        }
        catch(error){
            alert(error)
        }
        finally{
            toggleLoading(false);
        }
    }

    const [fontsLoaded] = useFonts(fontStyle)
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
    return(
        <View style={{
            height:height,
            backgroundColor:color.bg,
        }}>
            <View style={{
                height:height*0.2,
                justifyContent:'center',
            }}>
                <Text style={{
                    color:color.white,
                    fontFamily:'AudioWide',
                    fontSize:44,
                    textAlign:'center',
                }}>
                    Create a Profile
                </Text>
            </View>
            {
                loading?
                <ActivityIndicator size={150} color={color.blue} />
                :
                <View style={{
                    height:height*.5,
                    justifyContent:'flex-start',
                    alignItems:'center',
                    gap:14
                }}>
                    <View>
                        <View style={{flexDirection:'row',gap:8}}>
                            <Text style={[styles.textLight,{
                                fontFamily:'Sans',
                                fontSize:20,
                                textAlign:'left',
                                
                            }]}>What should we call you?</Text>
                            {warning.username && <Ionicons color={color.red} size={24} name="warning" />}
                        </View>
                        <TextInput placeholderTextColor={`${color.white}66`} placeholder="Set a username" style={[styles.inputbox,{marginVertical:12}]} onChangeText={setUsername} value={username} />
                    </View>
                    <View>
                        <View style={{flexDirection:'row',gap:8}}>
                            <Text style={[styles.textLight,{
                                fontFamily:'Sans',
                                fontSize:20,
                                textAlign:'left',
                            }]}>How should we call you?</Text>
                            {warning.phone && <Ionicons color={color.red} size={24} name="warning" />}
                        </View>
                        <PhoneNumberInput selectedCountry={country} handleInputValue={setPhone} handleSelectedCountry={setCountry} inputValue={phone} key={2} />
                    </View>
                    <View>
                        <View style={{flexDirection:'row',gap:8}}>
                            <Text style={[styles.textLight,{
                                fontFamily:'Sans',
                                fontSize:20,
                                textAlign:'left',
                                
                            }]}>What are your pronouns?</Text>
                            {(warning.fpronoun || warning.spronoun) && <Ionicons color={color.red} size={24} name="warning" />}
                        </View>
                        <View style={{
                            width:width*.85,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginVertical:12,
                        }}>
                            <TextInput onChangeText={setFPronoun} placeholderTextColor={`${color.fontlight}66`} placeholder="he/she/they" style={{...styles.inputbox,width:'49%'}} />
                            <TextInput onChangeText={setSPronoun} placeholderTextColor={`${color.fontlight}66`} placeholder="him/her/them" style={{...styles.inputbox,width:'49%'}} />
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.textLight,{
                            fontFamily:'Sans',
                            fontSize:20,
                            textAlign:'left'
                        }]}>I was born on ...</Text>
                        <Pressable onPress={()=>{setShowDate(true)}}>
                            <Text style={[styles.inputbox,{marginVertical:12,textAlign:'center',textAlignVertical:'center',fontSize:24,fontFamily:'SansBold'}]}>{date.toDateString()}</Text>
                        </Pressable>
                        <DateInput changeDate={setDate} setShowDatePicker={setShowDate} showDatePicker={showDate} key={4} />
                    </View>
                </View>
            }
            <View style={{
                height:height*.2,
                justifyContent:'flex-end',
                alignItems:'center',
                padding:1
            }}>
                <Pressable onPress={handleSubmit} style={[styles.button]}>
                    <Text style={[styles.textLight,{
                        fontSize:28,
                        textAlign:'center',
                        textAlignVertical:'center',
                        fontFamily:'SansBold'
                    }]}>
                        Proceed
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}