import { useEffect, useState } from "react"
import { View, Text, Dimensions, Image, Pressable } from "react-native"
import { downloadImageFromBucket, getUserProfile } from "../utils/crud_user"
import { color, styles } from "../styles/common";
import { Entypo } from "@expo/vector-icons";

export default function CardPost(postdata){
    const [photoUrl,setPhotoUrl]=useState();
    const [username,setUsername]=useState();

    async function fetchUserWithID(userid){
        const profile = await getUserProfile(userid);
        const photoUrl = profile.avatar?(await downloadImageFromBucket(profile.avatar))?.toString():null
        setPhotoUrl(photoUrl);
        setUsername(profile.username)
    }

    useEffect(()=>{
        fetchUserWithID(postdata.postdata.userid)
    },[])
    const width = Dimensions.get('screen').width
    return(
        <View style={{
            width:width*.9,
            aspectRatio:1.8,
            padding:12,
            borderWidth:1,
            backgroundColor:'#171717',
            borderRadius:18,
            gap:8,
            justifyContent:'space-between'
        }}>
            <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
                <Image style={{borderRadius:100}} width={25} height={25} source={{uri:photoUrl}} />
                <Text style={{color:color.white}}>@{username}</Text>
            </View>
            <View style={{flex:1,gap:4}}>
                <Text style={{color:color.white,fontSize:18,fontWeight:'bold'}}>
                    {postdata.postdata.title.slice(0,20)}
                </Text>
                <Text style={{color:color.white}}>
                    {postdata.postdata.body.slice(0,100)}
                </Text>
            </View>
            <View style={{
                flexDirection:'row',
                width:'100%',
                justifyContent:'space-between'
            }}>
                <View style={{flexDirection:'row',alignItems:'center',gap:16}}>
                    <Pressable>
                        <Entypo size={24} color={color.white} name="thumbs-up" />
                    </Pressable>
                    <Text style={{color:color.white}}>{postdata.postdata.likes}</Text>
                    <Pressable>
                        <Entypo size={24} color={color.white} name="thumbs-down" />
                    </Pressable>
                </View>
                <Pressable style={{
                        backgroundColor:color.blue,
                        padding:8,
                        borderRadius:8,
                        flexDirection:'row',
                        alignItems:'center',
                        gap:8
                    }}>
                    <Text style={{
                        color:color.white,
                    }}>
                        View
                    </Text>
                    <Entypo name="eye" size={16} color={color.white} />
                </Pressable>
            </View>
        </View>
    )
}