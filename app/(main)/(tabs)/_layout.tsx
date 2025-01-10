import { color } from "@/app/styles/common";
import { FontAwesome,Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout(){
    return(
        <Tabs
        screenOptions={{
            tabBarActiveTintColor:'#39a6e1',
            headerShown:false,
            tabBarShowLabel:false,
            tabBarInactiveTintColor:'#fff',
            tabBarStyle: {
                height:60,
                backgroundColor: '#474747',
            },
            tabBarItemStyle:{
                paddingVertical:10
            }
        }}>
            <Tabs.Screen
            name="dashboard"
            options={{
                tabBarIcon:({color})=><Feather size={28} name="home" color={color} />
            }}
            />
            <Tabs.Screen
            name="emergency"
            options={{
                tabBarIcon:({color})=><Feather size={28} name="info" color={color} />
            }} />
            <Tabs.Screen
            name="rulebook"
            options={{
                tabBarIcon:({color})=><Feather size={28} name="book-open" color={color} />
            }} />
        </Tabs>
    )
}