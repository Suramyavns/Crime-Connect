import { Stack } from "expo-router";

export default function AppLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="createProfile" options={{headerShown:false}} />
            <Stack.Screen name="dashboard" options={{headerShown:false}} />
        </Stack>
    )
}