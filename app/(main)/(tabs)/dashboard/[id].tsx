//@ts-nocheck
import { Dimensions, ScrollView, Text,TextInput,View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { color, styles } from '@/app/styles/common';
import { useEffect, useState } from "react"
import { downloadImageFromBucket, getUserProfile } from "../../../utils/crud_user"
import { Entypo, Feather } from "@expo/vector-icons";
import { addLike, getPost, hasLikedPost, updatePost } from "../../../utils/crud_posts";
import { auth, db, dbID } from "@/Appwrite";
import { useRouter } from "expo-router";
import { ActivityIndicator } from 'react-native';
import { Image,Pressable } from 'react-native';
import {createComment, queryComment} from '../../../utils/crud_comments'
import CardComment from '../../../components/CommentCard'
export default function PostView() {
    const [loading,setLoading]=useState(true);
  const { id } = useLocalSearchParams();
  const width = Dimensions.get('screen').width
  const router = useRouter();
  const [photoUrl,setPhotoUrl]=useState();
  const [username,setUsername]=useState();
  const [data,setData]=useState();
  const [userReactionToPost,setUserReactionToPost]=useState(null);
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState('');

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
          await addLike(id,(await auth.get()).$id,numlikes)
          await updatePost(postid,newPostData);
          fetchPostData()
      }
  }

  async function uploadComment(){
    setComment('')
    setLoading(true);
    await createComment({
        userid:(await auth.get()).$id,
        parentpostid:id,
        content:comment
    })
    fetchCommentsWithId(id);
    setLoading(false);
  }

  async function fetchCommentsWithId(id){
    const comments = (await queryComment('parentpostid',id)).documents.map((doc)=>doc.$id);
    setComments(comments)
  }

  async function fetchPostData(){
      const data = await getPost(id);
      fetchCommentsWithId(id);
      fetchUserWithID(data.userid);
      const PostData = {
          title:data.title,
          body:data.body,
          likes:data.likes,
          created_at:data.created_at,
          userid:data.userid,
      }

      setData(PostData)
      const currentUserReactedToThisPost = await hasLikedPost((await auth.get()).$id,id)
      if(currentUserReactedToThisPost.total!==0){
          setUserReactionToPost(currentUserReactedToThisPost.documents[0].reaction);
      }
      setLoading(false)
  }

  useEffect(()=>{
      fetchPostData()
  },[])

  return(
    <View style={{
        flex:1,
        paddingVertical:12,
        backgroundColor:color.black,
        alignItems:'center',
        gap:16,
    }}>
        <Text style={{width:'90%',color:color.white,fontSize:24,fontWeight:'bold',textAlign:'left'}}>
            View Post
        </Text>
        <View style={{
            width:width*.9,
            aspectRatio:1.8,
            padding:12,
            borderWidth:1,
            borderColor:color.white,
            borderRadius:18,
            gap:8,
            justifyContent:loading?'center':'space-between'
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
                </View>
                </>
            }
        </View>
        <View style={{
            width:'90%',
            flexDirection:'row',
            alignItems:'center',
            gap:10
        }}>
            <TextInput onChangeText={setComment} value={comment} placeholderTextColor={'#888'} style={{
                ...styles.inputbox,
                width:'80%',
                borderColor:color.white,
            }} placeholder='Write a comment...' />
            <Pressable onPress={uploadComment} style={{
                borderWidth:1,
                borderColor:comment.length>0?color.white:'#888',
                padding:12,
                borderRadius:100
            }}>
                <Feather name='send' color={comment.length>0?color.white:'#888'} size={32} />
            </Pressable>
        </View>
        <Text style={{width:'90%',color:color.white,fontSize:24,fontWeight:'bold',textAlign:'left'}}>
            Comments
        </Text>
        <ScrollView contentContainerStyle={{
            alignItems:'center',
            justifyContent:'center',
            gap:12,
        }} style={{
            flex:1,
            width:'90%',
            borderRadius:18,
        }}>
            {
                loading?
                <ActivityIndicator size={100} color={color.blue} />
                :
                <>
                {
                    comments.length>0?
                    <>
                    {comments.map((comment,index)=>{
                        return <CardComment commentid={comment} key={index} />
                    })}
                    </>
                    :
                    <Text style={{
                        width:'90%',
                        textAlign:'center',
                        fontSize:16,
                        color:color.white
                    }}>Be the first to comment here!</Text>
                }
                </>
            }
        </ScrollView>
    </View>
  )
}

PostView.options={
    headershown:false
}
