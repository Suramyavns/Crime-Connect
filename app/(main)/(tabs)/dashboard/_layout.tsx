import { Stack } from "expo-router";

export default function AppLayout(){
    return(
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="management" options={{headerShown:false}} />
            <Stack.Screen name="postCreate" options={{headerShown:false}} />
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    )
}