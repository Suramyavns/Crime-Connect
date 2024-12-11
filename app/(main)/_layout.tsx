import { auth } from "@/FirebaseConfig";
import { Stack, useNavigation } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function AppLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="createProfile" options={{headerShown:false}} />
        </Stack>
    )
}