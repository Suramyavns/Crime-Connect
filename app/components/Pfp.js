import { Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

export const default_avatar = require('../../assets/images/default_avatar.png')

export default function ProfilePicture({width=50,height=50}){
    const [pfp,setPfp] = useState(null);
    const getURI = async() => {
        const response = await AsyncStorage.getItem('profile');
        setPfp(JSON.parse(response).avatar)
    }
    useEffect(()=>{
        getURI()
    },[])
    return(
        <Image style={{width:width,height:height,borderRadius:100}} source={pfp?{uri:pfp}:default_avatar}/>
    )
}