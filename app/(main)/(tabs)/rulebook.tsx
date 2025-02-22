import HeaderComponent from "@/app/components/Header";
import { color, fontStyle, styles } from "@/app/styles/common";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { getRule } from '../../utils/rulebookNlp'

export default function Rulebook(){

    const [prompt,setPrompt]=useState<string>();
    const [chat,setChat]=useState<string[]>([]);

    const [fontsloaded] = useFonts(fontStyle)
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height

    async function handleSend(){
        if(prompt){
            const response = await getRule(prompt);
            const newChat = chat;
            newChat.push(prompt);
            newChat.push(response);
            setChat(newChat);
            setPrompt(undefined);
        }
    }

    useEffect(()=>{
        setChat([])
    },[])

    return(
        <View style={{
            height:'100%',
            paddingVertical:18,
            backgroundColor:color.bg
        }}>
            <HeaderComponent title={"Rulebook"} />
            <View style={{
                height:'90%',
                paddingVertical:24,
                justifyContent:'space-between'
            }}>
                <View style={{
                    height:'85%',
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    {
                        chat.length===0?
                        <Text style={[styles.textLight,{
                            fontFamily:'AudioWide',
                            fontSize:24
                        }]}>
                            What can I help you with?
                        </Text>
                        :
                        <ScrollView>
                            {chat.map((text,index)=>{
                                return(
                                    <View key={index} style={{
                                        flexDirection:'row',
                                        justifyContent:index%2==0?'flex-end':'flex-start',
                                        margin:8,
                                        width:width*.9
                                    }}>
                                        <Text style={{
                                            color:'white',
                                            fontSize:18,
                                            borderRadius:18,
                                            padding:12,
                                            backgroundColor:'#333333',
                                        }}>
                                            {text}
                                        </Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    }
                </View>
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'row',
                    gap:6,
                    paddingHorizontal:6
                }}>
                    <TextInput value={prompt?prompt:""} onChangeText={setPrompt} style={[styles.inputbox,{
                        width:width*.8,
                        borderWidth:1,
                        borderColor:color.white,
                        borderRadius:12,
                        padding:16
                    }]} placeholderTextColor={`${color.white}aa`} placeholder="Write your queries here..." />
                    <Pressable disabled={prompt==undefined} onPress={handleSend} style={{
                        borderColor:color.white,
                        borderWidth:1,
                        borderRadius:'100%',
                        padding:12,
                        backgroundColor:color.white
                    }}>
                        <Ionicons name="send" size={32} color={color.black} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}