import { Stack } from "expo-router";

export default function AppLayout(){
    return(
        <Stack>
            <Stack.Screen name="management" options={{headerShown:false}} />
            <Stack.Screen name="postCreate" options={{headerShown:false}} />
            <Stack.Screen name="postRead" options={{headerShown:false}} />
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    )
}