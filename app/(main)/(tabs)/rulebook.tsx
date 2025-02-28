import HeaderComponent from "@/app/components/Header";
import { color, fontStyle, styles } from "@/app/styles/common";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { getRule } from '../../utils/rulebookNlp'
import Markdown from 'react-native-markdown-display'

export default function Rulebook(){

    const [prompt,setPrompt]=useState<string>();
    const [chat,setChat]=useState<string[]>([]);
    const [loading,setLoading]=useState(false);

    const [fontsloaded] = useFonts(fontStyle)
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height

    async function handleSend(){
        if(prompt){
            setLoading(true);
            setPrompt(undefined);
            const response = await getRule(prompt);
            const newChat = chat;
            newChat.unshift(response);
            newChat.unshift(prompt);
            setChat(newChat);
            setLoading(false);
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
            <ScrollView contentContainerStyle={{
                alignItems:'center',
                justifyContent:'space-between',
                flex:1,
            }} style={{
                height:'100%',
                flexDirection:'column',
            }}>
                {
                    chat.length>0 &&
                    <Pressable onPress={()=>{setChat([])}} style={{
                        backgroundColor:color.white,
                        width:width*.9,
                        padding:12,
                        borderRadius:12,
                    }}>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            textAlign:'center'
                        }}>Start a new chat</Text>
                    </Pressable>
                }
                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <>
                    {
                        loading?
                        <ActivityIndicator color={color.blue} size={100} />
                        :
                        <>
                            {
                            chat.length===0?
                            <Text style={[styles.textLight,{
                                fontFamily:'AudioWide',
                                fontSize:24
                            }]}>
                                What can I help you with?
                            </Text>
                            :
                            <ScrollView style={{
                                width:width*.99
                            }}>
                                {chat.map((text,index)=>{
                                    return(
                                        <View key={index} style={{
                                            flexDirection:'row',
                                            justifyContent:index%2==0?'flex-end':'flex-start',
                                            margin:8,
                                            paddingHorizontal:8,
                                            width:'100%'
                                        }}>
                                            <View style={{
                                                width:index%2==0?'auto':'80%'
                                            }}>
                                                <ScrollView style={{
                                                    borderRadius:18,
                                                    padding:12,
                                                    backgroundColor:'#333333',
                                                }}>
                                                    <Markdown style={markdownStyles}>
                                                        {text}
                                                    </Markdown>
                                                </ScrollView>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        }
                        </>
                    }
                    </>
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
            </ScrollView>
        </View>
    )
}

const markdownStyles = StyleSheet.create({
    // Headings
    heading1: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#ffffff', // White
      marginBottom: 8,
    },
    heading2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 6,
    },
    heading3: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 4,
    },
  
    // Text
    text: {
      color: '#e0e0e0', // Light grey for readability
      fontSize: 16,
      lineHeight: 24,
    },
  
    // Bold
    strong: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  
    // Italic
    em: {
      fontStyle: 'italic',
      color: '#e0e0e0',
    },
  
    // Links
    link: {
      color: '#4da6ff', // Light blue for visibility
      textDecorationLine: 'underline',
    },
  
    // Blockquotes
    blockquote: {
      backgroundColor: '#333333', // Darker background for contrast
      padding: 8,
      marginVertical: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#4da6ff',
    },
  
    // Code blocks
    code_block: {
      backgroundColor: '#222222',
      padding: 8,
      borderRadius: 4,
    },
    code_inline: {
      backgroundColor: '#333333',
      color: '#e0e0e0',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontFamily: 'monospace',
    },
  
    // Lists
    bullet_list: {
      color: '#e0e0e0',
    },
    ordered_list: {
      color: '#e0e0e0',
    },
    list_item: {
      color: '#e0e0e0',
      marginVertical: 4,
    },
  
    // Horizontal rule
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: '#555555',
      marginVertical: 12,
    },
  });