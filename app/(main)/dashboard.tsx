import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { auth } from '../../Appwrite';
import { router } from 'expo-router';
import {getUserProfile} from '../utils/crud_user'
import { color, styles } from '../styles/common';

const UserProfile = () => {

    async function fetchUserProfile(id:string){
      const response = await getUserProfile(id);
      if(response){
        //
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
      <Pressable style={styles.button} onPress={async()=>{await auth.deleteSession('current');router.replace('/(auth)')}}>
        <Text style={{color:color.white}}>
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;