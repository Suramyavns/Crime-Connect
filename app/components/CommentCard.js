import { View,Text, ActivityIndicator } from "react-native"
import { color } from "../styles/common"
import { useEffect, useState } from "react"
import { Image } from "react-native"
import { getComment } from "../utils/crud_comments"
import { getUserProfile,downloadImageFromBucket } from "../utils/crud_user";
export default function CardComment({commentid}){
    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);
    const [photoUrl,setPhotoUrl]=useState()
    const [username,setUsername]=useState()

    async function fetchUserWithID(userid){
        const profile = await getUserProfile(userid);
        const photoUrl = profile.avatar?(await downloadImageFromBucket(profile.avatar))?.toString():null
        setPhotoUrl(photoUrl);
        setUsername(profile.username)
    }

    const fetchCommentData = async()=>{
        const commentData = await getComment(commentid);
        fetchUserWithID(commentData.userid)
        setData(commentData);
        setLoading(false)
    }
    useEffect(()=>{
        fetchCommentData();
    })
    return(
        <View style={{
            width:'90%',
            borderWidth:1,
            borderColor:'#888',
            padding:8,
            borderRadius:12
        }}>
            {
                loading?
                <ActivityIndicator color={color.blue} size={50} />
                :
                <>
                    <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
                        <Image style={{borderRadius:100}} width={25} height={25} source={{uri:photoUrl}} />
                        <Text style={{color:color.white}}>@{username}</Text>
                    </View>
                    <Text style={{
                        padding:12,
                        color:color.white
                    }}>
                        {data && data.content}
                    </Text>
                </>
            }
        </View>
    )
}