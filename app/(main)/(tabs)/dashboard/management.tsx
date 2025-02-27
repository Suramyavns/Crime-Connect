import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { auth } from '../../../../Appwrite';
import { router } from 'expo-router';
import {downloadImageFromBucket, getUserProfile} from '../../../utils/crud_user'
import { color, styles } from '../../../styles/common';
import { IUser } from '../../../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../../../components/Header';


const UserProfile = () => {
    const [userProfile,setUserProfile]=useState<IUser|null>(null)
    const [loading,setLoading] = useState(false);

    const getProfile = async() => {
        const user = await AsyncStorage.getItem('profile');
        //@ts-ignore
        setUserProfile(JSON.parse(user));
    }

    useEffect(()=>{
      setLoading(true);
      try{
        getProfile()
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
          <HeaderComponent title='Manage' />
          <Pressable style={styles.button} onPress={async()=>{setLoading(true);await auth.deleteSession('current');await AsyncStorage.clear();router.replace('/(auth)');setLoading(false)}}>
            <Text style={{color:color.white,fontFamily:'SansBold',fontSize:24,textAlign:'center'}}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

export default UserProfile;