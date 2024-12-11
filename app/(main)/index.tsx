import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { auth } from '@/FirebaseConfig';
import { router, useNavigation } from 'expo-router';
import {getUserProfile} from '../utils/crud_user'
import { color } from '../styles';

const UserProfile = () => {
    const [user, setUser ] = useState<Object|null>(null);
    const [loading,setLoading]=useState(false);

    async function fetchUserProfile(id:string){
      const response = await getUserProfile(id);
      if(response){
        setUser(response);
      }
      else{
        router.push('/(main)/createProfile')
      }
    }

    useEffect(()=>{
      setLoading(true);
      try{
        const uid = auth.currentUser?.uid;
        if(uid){
          fetchUserProfile(uid);
        }
        else{
          router.replace('/')
        }
      }
      catch(error){
        console.error(error)
      }
      
      setLoading(false)
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