import { auth } from "@/FirebaseConfig";
import { useNavigation,router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, TextInput, Pressable, StyleSheet } from "react-native";
import { color, styles } from "../styles";
import { useFonts } from "expo-font";
import DateInput from "../components/DatePicker";
import PhoneNumberInput from '../components/PhoneNumberInput'

export default function ProfileCreation(){
    const [date,setDate]=useState(new Date())
    const [showDate,setShowDate]=useState(false);
    const [gender,setGender]=useState<string>()
    const [phone,setPhone]=useState(null);
    const [country,setCountry]=useState(null)
    const [username,setUsername] = useState<string>()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                // [WIP]
            }
            else{
                router.replace('/')
            }
        })
    })

    const genders = [
        {
            "label":"Male 👨",
            'value':'m'
        },
        {
            "label":"Female 👩",
            'value':'f'
        },
        {
            "label":"Other 🏳️‍🌈",
            'value':'o'
        }
    ]

    const [fontsLoaded] = useFonts({
        'AudioWide':require('../../assets/fonts/Audiowide/Audiowide-Regular.ttf'),
        'Sans':require('../../assets/fonts/Manrope/static/Manrope-Medium.ttf'),
        'SansBold':require('../../assets/fonts/Manrope/static/Manrope-Bold.ttf')
    })
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
                justifyContent:'center',
                alignItems:'center',
                gap:8
            }}>
                <View>
                    <Pressable style={{
                        width:width*.85,
                        paddingHorizontal:12
                    }} onPress={()=>{setShowDate(true)}}>
                        <Text style={{color:color.fontlight,textAlignVertical:'center',fontFamily:'Sans',fontSize:24}}>When were you born? {"\u{1f382}"}</Text>
                        <Text style={profileStyle.dateBox}>{date.toDateString()}</Text>
                    </Pressable>
                    <DateInput showDatePicker={showDate} changeDate={setDate} setShowDatePicker={setShowDate} />
                </View>
                <View>
                    <Text style={{width:width*.85,paddingHorizontal:12,color:color.fontlight,fontFamily:'Sans',fontSize:24}}>What is your gender?</Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center', 
                        gap:8
                    }}>
                        {
                            genders.map((gen,index)=>{
                                return(
                                    <Pressable key={index} onPress={()=>{setGender(gen.value)}}>
                                        <Text style={gen.value===gender?[profileStyle.genderBox,profileStyle.scaled]:profileStyle.genderBox}>{gen.label}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </View>
                <View>
                    {/* <Text style={{width:width*.85,paddingHorizontal:12,color:color.fontlight,fontFamily:'Sans',fontSize:24}}>What is your number?</Text> */}
                    <PhoneNumberInput selectedCountry={country} handleInputValue={setPhone} handleSelectedCountry={setCountry} inputValue={phone} key={2} />
                </View>
                <View>
                    <TextInput placeholderTextColor={`${color.white}66`} placeholder="Set a username" style={profileStyle.inputbox} onChangeText={setUsername} value={username} />
                </View>
            </View>
            <View style={{
                height:height*.2,
                justifyContent:'flex-end',
                alignItems:'center',
                padding:1
            }}>
                <Pressable style={[{
                    width:width*.75,
                    padding:8,
                    borderRadius:8,
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
                },styles.blue]}>
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

const profileStyle = StyleSheet.create({
    dateBox:{
        height:56,
        textAlignVertical:'center',
        color:color.white,
        fontSize:24,
        fontFamily:'SansBold',
        textAlign:'center',
        padding:8,
        borderWidth:1,
        marginVertical:12,
        borderRadius:12,
        borderColor:color.blue,
    },
    genderBox:{
        height:'auto',
        color:color.white,
        fontSize:23,
        fontFamily:'Sans',
        textAlign:'center',
        padding:8,
        borderWidth:1,
        marginVertical:12,
        borderRadius:8,
        textAlignVertical:'center',
        borderColor:`${color.blue}`,
    },
    inputbox:{
        borderRadius:12,
        borderWidth:1,
        width:Dimensions.get('screen').width*.8,
        borderColor:color.blue,
        height:56,
        paddingHorizontal:12,
        fontSize:20,
        fontFamily:'SansBold',
        color:color.white,
        margin:12
    },
    scaled:{
        fontFamily:'SansBold',
        backgroundColor:color.blue
    }
})