import { useContext, useEffect, useState } from "react";
import { Text,Pressable, StyleSheet, View } from "react-native";
import { getMenuItems } from "../services/menuService";
import { UserContext } from "../context/UserContext";


export default function FilterMenuButton({filterName}) {
    const [pressed, setPressed] = useState(false);
    const { removeFilter , addFilter  } = useContext(UserContext);

    return (
        <View style={{ flex: 1 }}>
            <Pressable
                style={[ButtonStyle.button, pressed ? { backgroundColor: '#495E57' } : { backgroundColor: '#d2e8d0' }]}
                onPress={async () => {
                    setPressed(!pressed)
                    if(!pressed){
                        addFilter(filterName)
                    }else
                    {
                        removeFilter(filterName)
                    } 
                    
                }}
            >
                <Text style={[ButtonStyle.buttonText, pressed ? { color: '#d2e8d0' } : { color: '#495E57' }]}>{filterName}</Text>
            </Pressable>
        </View>

    )
}

const ButtonStyle = StyleSheet.create({
    button:{
        borderRadius:16,
        backgroundColor: '#d2e8d0',
        marginRight: 20,
        alignItems:'center'
    },
    buttonText:{
        color:'#495E57',
        fontSize: 18,
        padding: 10,
        fontWeight:'bold',
    }
});