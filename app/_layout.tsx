import { Stack } from "expo-router";

export default function AppLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="(auth)" options={{headerShown:false}} />
            <Stack.Screen name="(main)" options={{headerShown:false}} />
        </Stack>
    )
}