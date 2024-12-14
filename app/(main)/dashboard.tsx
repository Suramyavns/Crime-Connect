import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ImageBackground } from 'react-native';
import { auth } from '../../Appwrite';
import { router } from 'expo-router';
import {downloadImageFromBucket, getUserProfile} from '../utils/crud_user'
import { color, styles } from '../styles/common';
import { IUser } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProfilePicture from '../components/Pfp'

const UserProfile = () => {
    const [userProfile,setUserProfile]=useState<IUser|null>(null)

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
      try{
        getExistingUser()
      }
      catch(error){
        console.error(error)
      }
  }, []);

  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      padding:1,
      backgroundColor:color.bg
    }}>
      <ProfilePicture />
      <Pressable style={styles.button} onPress={async()=>{await auth.deleteSession('current');router.replace('/(auth)')}}>
        <Text style={{color:color.white}}>
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;