import HeaderComponent from "@/app/components/Header";
import { color, fontStyle, styles } from "@/app/styles/common";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";

export default function SOSPage(){
    const [fontsloaded] = useFonts(fontStyle)
    const width = Dimensions.get('screen').width
    const height = Dimensions.get('screen').height
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
                    height:'75%',
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <Text style={[styles.textLight,{
                        fontFamily:'AudioWide',
                        fontSize:24
                    }]}>
                        What can I help you with?
                    </Text>
                </View>
                <View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:20,
                    flexDirection:'row',
                    gap:6,
                    paddingHorizontal:6
                }}>
                    <TextInput style={[styles.inputbox,{
                        width:width*.8,
                        borderWidth:1,
                        borderColor:color.white,
                        borderRadius:12,
                        padding:16
                    }]} placeholderTextColor={`${color.white}aa`} placeholder="Write your queries here..." />
                    <Pressable style={{
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