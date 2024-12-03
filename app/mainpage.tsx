import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/FirebaseConfig';
import { useNavigation } from 'expo-router';
import { styles } from './styles';

const UserProfile = () => {
    const navigator = useNavigation()
    const [user, setUser ] = useState<User|null>(null);

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in
              // console.log('User  is signed in:', user);
              // Redirect to the main page or dashboard
              setUser(user)
          } else {
              // User is signed out
              navigator.navigate('index')
              console.log('No user is signed in');
          }
      });
  }, []);

  return (
    <View>
      <Text>Welcome, {user?.displayName||user?.email}</Text>
      <Pressable style={[styles.btn,styles.black]} onPress={()=>{auth.signOut();}}>
        <Text style={[styles.textLight,{fontSize:24}]}>Log out</Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;