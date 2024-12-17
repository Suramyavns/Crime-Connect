import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, TextInput, Pressable, StyleSheet, ActivityIndicator, ImageBackground, Alert } from "react-native";
import { color, fontStyle, styles } from "../styles/common";
import { useFonts } from "expo-font";
import DateInput from "../components/DatePicker";
import PhoneNumberInput from '../components/PhoneNumberInput'
import {Ionicons,AntDesign} from '@expo/vector-icons'
import { createUserProfile, uploadImageToBucket } from "../utils/crud_user";
import {ICountry} from 'react-native-international-phone-number'
import {default_credibility} from '../utils/credibility'
import * as ImagePicker from 'expo-image-picker'
import { auth } from "@/Appwrite";
import { default_avatar } from "../components/Pfp";
interface Warnings{
    username:boolean,
    phone:boolean,
    fpronoun:boolean,
    spronoun:boolean
}

export default function ProfileCreation(){
    const [profile,setProfile]=useState<string>();
    const [date,setDate]=useState(new Date())
    const [showDate,setShowDate]=useState(false);
    const [fpronoun,setFPronoun]=useState<string>()
    const [spronoun,setSPronoun]=useState<string>()
    const [phone,setPhone]=useState<string>('');
    const [country,setCountry]=useState<ICountry>()
    const [username,setUsername] = useState<string>()
    const [loading,toggleLoading]=useState(false)
    const [warning,setWarning]=useState<Warnings>({
        username:false,
        fpronoun:false,
        phone:false,
        spronoun:false
    })

    const validateForm = async() =>{
        const newWarning = {
            username:!Boolean(username?.length),
            phone:!Boolean(phone?.length>=10),
            fpronoun:!Boolean(fpronoun),
            spronoun:!Boolean(spronoun)
        }
        setWarning(newWarning);
        return !Object.values(newWarning).some(item=>item===true)
    }

    const uploadProfile = async () =>{
        const user = await auth.get()
        if(profile!==undefined){
            const response = await fetch(profile)
            const blob = await response.blob()
            const file = {
                name:`avatar_${user.$id}.jpg`,
                size:blob.size,
                type:blob.type,
                uri:profile
            }
            const result = await uploadImageToBucket(user.$id,file)
            return result
        }
        else{
            return null;
        }
    }

    const pickProfile = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:'images',
            allowsEditing:false,
            quality:1,
            aspect:[1,1],
        })

        if(!result.canceled){
            setProfile(result.assets[0].uri)
        }
    }

    const handleSubmit = async() => {
        const user = await auth.get();
        if(!(await validateForm())){
            return;
        }
        toggleLoading(true);
        try{
            const profileData = {
                'username':username,
                'phone':phone,
                'credibility':default_credibility,
                'email':user.email,
                'fpronoun':fpronoun,
                'spronoun':spronoun,
                'dob':date,
                'country':country?.callingCode
            }
            const response = await uploadProfile()
            if(response){
                await createUserProfile(user.$id,{
                    ...profileData,
                    'avatar':response.$id
                })
            }
            else{
                await createUserProfile(user.$id,profileData)
            }
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
                <View style={{
                    height:height*.5,
                    justifyContent:'flex-start',
                    alignItems:'center',
                    gap:14
                }}>
                    {
                        loading?
                        <ActivityIndicator color={color.blue} size={150} />
                        :
                    <>
                    <View>
                        <View style={{flexDirection:'row',gap:8}}>
                            <Text style={[styles.textLight,{
                                fontFamily:'Sans',
                                fontSize:20,
                                textAlign:'left',
                                
                            }]}>What should we call you?</Text>
                            {warning.username && <Ionicons color={color.red} size={24} name="warning" />}
                        </View>
                        <View style={{
                            width:width*.85,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            gap:16
                        }}>
                            <ImageBackground source={profile ? { uri: profile } : default_avatar} imageStyle={{opacity:.4,resizeMode:'cover',borderRadius:100}} style={{...customs.round_btn}}>
                                <Pressable onPress={()=>{pickProfile()}}>
                                    <AntDesign size={24} color={color.white} name="edit" />
                                </Pressable>
                            </ImageBackground>
                            <TextInput placeholderTextColor={`${color.white}66`} placeholder="Set a username" style={{marginVertical:12,...styles.inputbox,width:'80%'}} onChangeText={setUsername} value={username} />
                        </View>
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
                    </>
                    }
                </View>
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

const customs = StyleSheet.create({
    round_btn:{
        borderRadius:100,
        width:56,
        height:56,
        justifyContent:'center',
        alignItems:'center'
    }
})