import { auth } from "@/FirebaseConfig";
import { Stack, useNavigation } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function AppLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="register" options={{headerShown:false}} />
            <Stack.Screen name="login" options={{headerShown:false}} />
            <Stack.Screen name="mainpage" options={{headerShown:false}} />
        </Stack>
    )
}