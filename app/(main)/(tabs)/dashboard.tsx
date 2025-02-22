import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { auth } from '../../../Appwrite';
import { router } from 'expo-router';
import {downloadImageFromBucket, getUserProfile} from '../../utils/crud_user'
import { color, styles } from '../../styles/common';
import { IUser } from '../../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../../components/Header';


const Dashboard = () => {
    const [userProfile,setUserProfile]=useState<IUser|null>(null)
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

  return (
    <View style={{
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
        </View>
      }
    </View>
  );
};

export default Dashboard;