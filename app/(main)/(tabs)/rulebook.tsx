import HeaderComponent from "@/app/components/Header";
import { color } from "@/app/styles/common";
import { Text, View } from "react-native";

export default function SOSPage(){
    return(
        <View style={{
            height:'100%',
            paddingVertical:18,
            backgroundColor:color.bg
        }}>
            <HeaderComponent title={"RuleBook"} />
        </View>
    )
}