import { View, Text, StyleSheet } from "react-native";

export default function Splash(){
    return(
        <View style={ProfileStyles.container}>
            <Text> Splash screen</Text>
        </View>
    );
}

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});