import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { auth } from '../../Appwrite';
import { router } from 'expo-router';
import {downloadImageFromBucket, getUserProfile} from '../utils/crud_user'
import { color, styles } from '../styles/common';
import { IUser } from '../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../components/Header';


const UserProfile = () => {
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
      setLoading(false);
  }, []);

  return (
    <View style={{
      height:'100%',
      paddingVertical:12,
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:color.bg
    }}>
      {
        loading?
        <ActivityIndicator size="large" color={color.blue} />
        :
        <>
          <HeaderComponent title='Dashboard' />
          <Pressable style={styles.button} onPress={async()=>{setLoading(true);await auth.deleteSession('current');await AsyncStorage.clear();router.replace('/(auth)');setLoading(false)}}>
            <Text style={{color:color.white,fontFamily:'SansBold',fontSize:24,textAlign:'center'}}>
              Sign Out
            </Text>
          </Pressable>
        </>
      }
    </View>
  );
};

export default UserProfile;