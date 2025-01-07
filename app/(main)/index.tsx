import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../../Appwrite';
import { router } from 'expo-router';
import {getUserProfile} from '../utils/crud_user'
import { color } from '../styles/common';

const UserProfile = () => {

    async function fetchUserProfile(id:string){
      const response = await getUserProfile(id);
      if(response){
        router.replace('/(main)/(tabs)/dashboard')
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
      <ActivityIndicator size={150} color={color.blue} />
    </View>
  );
};

export default UserProfile;