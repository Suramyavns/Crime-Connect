import { Image,Text, View, Pressable } from "react-native"
import { styles } from "./styles"
export default function Index(){
    return(
        <View style={styles.container}>
            <Image style={{
                height:'60%'
            }} resizeMode="cover" source={require('../assets/images/supers.png')}/>
            <View style={{
                flex:1,
                flexDirection:'column',
                justifyContent:'flex-start',
                alignItems:'center'
            }}>
                <Text style={[styles.textDark,{
                    fontSize:32,
                    fontWeight:'bold',
                    fontFamily:'JockeyOne-Regular'
                }]}>
                    Welcome to
                </Text>
                <Text style={[styles.textDark,{
                    fontSize:64,
                    fontWeight:'bold',
                    fontFamily:'JockeyOne-Regular'
                }]}>
                    CrimeConnect
                </Text>
                <Text style={[styles.textDark,{
                    fontSize:20,
                    fontWeight:'bold',
                    fontFamily:'JockeyOne-Regular'
                }]}>
                    Become responsible with your powers
                </Text>
            </View>
            <Pressable style={[{
                width:'90%',
                borderRadius:32,
                maxHeight:72,
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                margin:10
            },styles.blue]}>
                <Text style={[styles.textLight,{
                    fontSize:32,
                    fontFamily:'JockeyOne-Regular'
                }]}>Save your city</Text>
            </Pressable>
        </View>
    )
}