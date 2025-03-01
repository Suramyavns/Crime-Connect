import { useEffect, useState } from "react"
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator } from "react-native"
import { downloadImageFromBucket, getUserProfile } from "../utils/crud_user"
import { color, styles } from "../styles/common";
import { Entypo } from "@expo/vector-icons";
import { addLike, getPost, hasLikedPost, updatePost } from "../utils/crud_posts";
import { auth, db, dbID } from "@/Appwrite";
import { ID } from "react-native-appwrite";

export default function CardPost(id){
    const [postid,setPostId]=useState(null);
    const [photoUrl,setPhotoUrl]=useState();
    const [username,setUsername]=useState();
    const [loading,setLoading]=useState(true);
    const [data,setData]=useState();
    const [userReactionToPost,setUserReactionToPost]=useState(null);

    async function fetchUserWithID(userid){
        const profile = await getUserProfile(userid);
        const photoUrl = profile.avatar?(await downloadImageFromBucket(profile.avatar))?.toString():null
        setPhotoUrl(photoUrl);
        setUsername(profile.username)
    }

    async function handleLike(numlikes){
        if(userReactionToPost===null){
            setLoading(true);
            const newPostData = {
                title:data.title,
                body:data.body,
                created_at:data.created_at,
                userid:data.userid,
                likes:data.likes+numlikes
            }
            await addLike(id.postdata,(await auth.get()).$id,numlikes)
            await updatePost(postid,newPostData);
            fetchPostData()
        }
    }

    async function fetchPostData(){
        setPostId(id.postdata)
        const data = await getPost(id.postdata);
        fetchUserWithID(data.userid);
        const PostData = {
            title:data.title,
            body:data.body,
            likes:data.likes,
            created_at:data.created_at,
            userid:data.userid,
        }

        setData(PostData)
        const currentUserReactedToThisPost = await hasLikedPost((await auth.get()).$id,id.postdata)
        if(currentUserReactedToThisPost.total!==0){
            setUserReactionToPost(currentUserReactedToThisPost.documents[0].reaction);
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchPostData()
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
            {
                loading?
                <ActivityIndicator color={color.blue} size={100} />
                :
                <>
                <View style={{flexDirection:'row',alignItems:'center',gap:8}}>
                    <Image style={{borderRadius:100}} width={25} height={25} source={{uri:photoUrl}} />
                    <Text style={{color:color.white}}>@{username}</Text>
                </View>
                <View style={{flex:1,gap:4}}>
                    <Text style={{color:color.white,fontSize:18,fontWeight:'bold'}}>
                        {data.title.slice(0,20)}
                    </Text>
                    <Text style={{color:color.white}}>
                        {data.body.slice(0,100)}
                    </Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    width:'100%',
                    justifyContent:'space-between'
                }}>
                    <View style={{flexDirection:'row',alignItems:'center',gap:16}}>
                        <Pressable onPress={()=>{handleLike(1)}}>
                            <Entypo size={24} color={userReactionToPost===1?color.blue:color.white} name="thumbs-up" />
                        </Pressable>
                        <Text style={{color:color.white}}>{data.likes}</Text>
                        <Pressable onPress={()=>{handleLike(-1)}}>
                            <Entypo size={24} color={userReactionToPost===-1?color.blue:color.white} name="thumbs-down" />
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
                </>
            }
        </View>
    )
}