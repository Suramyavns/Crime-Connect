import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ImageBackground, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { auth } from '../../../../Appwrite';
import { router } from 'expo-router';
import {downloadImageFromBucket, getUserProfile} from '../../../utils/crud_user'
import { color, styles } from '../../../styles/common';
import { IUser } from '../../../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../../../components/Header';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { listPosts } from '@/app/utils/crud_posts';
import { IPost } from '@/app/interfaces/Post';
import CardPost from '../../../components/CardPost'

const Dashboard = () => {
    const [userProfile,setUserProfile]=useState<IUser|null>(null)
    const [feedPosts,setFeedPosts]=useState([]);
    const [loading,setLoading] = useState(false);
    async function fetchUserProfile(id:string){
      const response = await getUserProfile(id);
      if(response){
        const data = {
          avatar:response.avatar?(await downloadImageFromBucket(response.avatar))?.toString():null,
          username:response.username,
          phone:response.phone,
          credibility:response.credibility,
          email:response.email,
          fpronoun:response.fpronoun,
          spronoun:response.spronoun,
          dob:new Date(response.dob),
          country:response.country
        }
        //@ts-ignore
        setUserProfile(data);
        await AsyncStorage.setItem('profile',JSON.stringify(data))
      }
      else{
        router.replace('/(main)/createProfile')
      }
    }

    const getExistingUser = async() => {
      const user = await auth.get();
      fetchUserProfile(user.$id)
    }

    useEffect(()=>{
        setLoading(true);
        try{
          getExistingUser()
        }
        catch(error){
          console.error(error)
        }
        setTimeout(()=>{
          setLoading(false);
        },1000)
    }, []);

    const getFeed = async()=>{
      const posts = await listPosts();
      const feedData = posts.documents.map((doc)=>{
        const data = {
          postid:doc.$id
        }
        return data
      })      
      // @ts-ignore
      setFeedPosts(feedData)
    }

    useEffect(()=>{
      getFeed()
    },[])

  const width = Dimensions.get('screen').width

  return (
    <View style={{
      flex:1,
      height:'100%',
      paddingVertical:18,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:color.bg
    }}>
      {
        loading?
        <ActivityIndicator size={150} color={color.blue} />
        :
        <View style={{height:'100%',justifyContent:'space-between',alignItems:'center'}}>
          <HeaderComponent title='Dashboard' />
          <View style={{
            flex:1,
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            gap:8
          }}>
            <Text style={{
              width:width*.9,
              fontSize:24,
              color:color.white,
              fontWeight:'bold',
              textAlign:'left',
            }}>Your Feed</Text>
            <ScrollView contentContainerStyle={{
              justifyContent:'center',
              alignItems:'center',
              gap:12
            }} style={{
              flex:1,
              width:'100%',
            }}>
              {
                feedPosts && feedPosts.length>0?
                <>
                  {
                    feedPosts.map((post,index)=>{
                      //@ts-ignore
                      return <CardPost key={index} postdata={post.postid} />
                    })
                  }
                </>
                :
                <View style={{
                  flexDirection:'row',
                  gap:8,
                }}>
                  <Entypo size={24} name='emoji-sad' color={color.white} />
                  <Text style={{
                    color:color.white,
                    fontSize:24,
                  }}>
                    Nothing to see here!
                  </Text>
                </View>
                
              }
            </ScrollView>
            <Pressable onPress={()=>{
              router.push('/(main)/(tabs)/dashboard/postCreate')
            }} style={{
              width:width*.9,
              padding:12,
              borderRadius:12,
              backgroundColor:color.white,
              justifyContent:'center',
              alignItems:'center',
              flexDirection:'row',
              gap:10,
            }}>
              <Text style={{
                fontSize:18,
                fontWeight:'bold',
                textAlign:'center',
                alignItems:'center',
              }}>
                New Post
              </Text>
              <AntDesign size={18} name='pluscircle' />
            </Pressable>
          </View>
        </View>
      }
    </View>
  );
};

export default Dashboard;