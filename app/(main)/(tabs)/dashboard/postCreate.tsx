import { View, Text, TextInput, Pressable, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { color, styles } from "../../../styles/common";
import { useEffect, useState } from "react";
import ProfilePicture from "../../../components/Pfp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../interfaces/User";
import { auth } from "@/Appwrite";
import { IPost } from "@/app/interfaces/Post";

import {createPost} from '../../../utils/crud_posts'
import { router } from "expo-router";

export default function PostCreate(){
    const [loading,setLoading]=useState(false);
    const [body,setBody]=useState<string>('')
    const [user,setUser]=useState<IUser>();
    const [title,setTitle]=useState<string>('');

    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height

    const getUser = async() =>{
        const response = await AsyncStorage.getItem('profile');
        // @ts-ignore
        const data = JSON.parse(response);   
        setUser(data);
    }

    const handlePost = async()=>{{
        setLoading(true);
        const data : IPost = {
            userid:(await auth.get()).$id,
            title:title,
            body:body,
            likes:0,
            created_at:new Date().toISOString()
        }
        try {       
            const res = await createPost(data);
            router.replace('/(main)/(tabs)/dashboard')
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }}

    useEffect(()=>{
        getUser()
    },[])

    return(
        <View style={{
            flex: 1,
            backgroundColor:color.black,
            padding:16,
            justifyContent:loading?'center':'flex-start',
            alignItems:'center',
            gap:10
        }}>
            {
                loading?
                <ActivityIndicator size={100} color={color.white} />
                :
                <>
                    <Text style={{
                        fontSize:24,
                        fontWeight:'bold',
                        textAlign:'left',
                        color:color.white,
                        width:'100%'
                    }}>Create a Post here</Text>
                    <View style={{
                        ...styles.inputbox,
                        height:height*.6,
                        width:'100%',
                        padding:12,
                        borderColor:'#888',
                        gap:12
                    }}>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                            justifyContent:'flex-start',
                            alignItems:'center',
                            gap:6
                        }}>
                            <>
                            <ProfilePicture width={25} height={25} />
                            <Text style={{
                                color:color.white
                            }}>
                                @{user?.username}
                            </Text>
                            </>
                        </View>
                        <TextInput value={title} onChangeText={setTitle} placeholder="Give it a title" placeholderTextColor={'#888'} style={{
                            fontSize:18,
                            textAlignVertical:'center',
                            textAlign:'left',
                            height:'10%',
                            color:color.white,
                            borderWidth:1,
                            borderColor:color.white,
                            paddingHorizontal:12,
                            borderRadius:8
                        }} />
                        <View style={{
                            height:'70%',
                            borderWidth:1,
                            borderColor:color.white,
                            borderRadius:8,
                            padding:12,
                        }}>
                            <TextInput aria-disabled={body?.length>3000} value={body} onChangeText={setBody} multiline placeholderTextColor={'#888'} placeholder="You can raise issues or seek help regarding any topic." style={{
                                fontSize:18,
                                color:color.white,
                                textAlignVertical:'top',
                            }} />
                        </View>
                        <View style={{
                            width:'99%',
                            display:'flex',
                            alignItems:'center',
                            flexDirection:'row',
                            justifyContent:'space-between'
                        }}>
                            <Pressable onPress={()=>{setBody(''),setTitle('')}} style={{
                                backgroundColor:color.white,
                                borderRadius:6,
                                padding:6,
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    textAlign:'center'
                                }}>Clear</Text>
                            </Pressable>
                            <Text style={{
                                color:color.white,
                                textAlign:'right',
                            }}>{body?.length||0}/3000</Text>
                        </View>
                    </View>
                    <Pressable onPress={handlePost} style={{
                        ...styles.button,
                        backgroundColor:color.white,
                        width:'100%',
                        padding:12
                    }}>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            textAlign:'center'
                        }}>Confirm Upload</Text>
                    </Pressable>
                </>
            }
        </View>
    )
}