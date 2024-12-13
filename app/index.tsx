import { router } from 'expo-router';
import {auth} from '../Appwrite'
import { color } from './styles/common';
import { View } from 'react-native';
export default async function App(){
    try{
        const user = await auth.get();
        if(user){
            router.replace('/(main)')
        }
    }
    catch(e){
        router.replace('/(auth)')
    }
    
    return(
        <View style={{backgroundColor:color.bg}}>

        </View>
    )
}