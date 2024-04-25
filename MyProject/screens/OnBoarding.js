import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{ useContext, useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { UserContext } from "../context/UserContext";

export default function OnBoarding(){
    const [email, changeEmail] = useState('');
    const [name, changeName] = useState('');   
    const { setIsLoggedIn} = useContext(UserContext);

    return(
        <View style={onBoardingStyles.container}>
            <View style={onBoardingStyles.logo}>
                <Image style={onBoardingStyles.img} source={require('../assets/Logo.png')} resizeMode='cover'></Image>
            </View>
            <View style={onBoardingStyles.formContainer}>
                <View style={[onBoardingStyles.formTitle, {paddingTop:45}]}>
                    <Text style={onBoardingStyles.styleText}>Let us get to know you</Text>
                </View>
                <View style={[onBoardingStyles.formTitle, {gap:15}]}>
                    <Text style={onBoardingStyles.styleText}>First Name</Text>
                    <TextInput style={onBoardingStyles.input} placeholder="First name" textAlign="left" value={name} onChangeText={changeName}>
                    </TextInput>

                    <Text style={onBoardingStyles.styleText}>Email</Text>
                    <TextInput style={onBoardingStyles.input} placeholder="Email" textAlign="left" keyboardType="email-address" value={email} onChangeText={changeEmail}>
                    </TextInput>
                </View>
            </View>
            <View style={onBoardingStyles.footerContainer}>
                <Pressable
                    style={onBoardingStyles.button}
                    onPress={async () => {
                        const personalInfo = JSON.stringify(
                            {
                                profileImage: '',
                                email: email,
                                firstName: name,
                                lastName: '',
                                phone: '',
                                emailNotifications: {
                                    orderStatuses: false,
                                    passwordChanges: false,
                                    specialOffers: false,
                                    newsletter: false
                                }
                            });
                        await AsyncStorage.multiSet([['@loggedIn', 'true'], ['@personal_info', personalInfo]]);
                        setIsLoggedIn(true)
                    }}
                    disabled={email == '' || name == ''}
                >
                <Text style={onBoardingStyles.buttonText}>{'Next'}</Text>
            </Pressable>
            </View>
        </View>
    );

}

const onBoardingStyles = StyleSheet.create({
    container:{
        
        flex:1
        
    },
    logo:{
        flex: 0.08,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent:'center'
    },
    img:{
        width: 200
    },
    formContainer:{
        flex: 0.72,
        backgroundColor: '#495E57',
    },
    formTitle:{
        flex: 0.5,
        alignItems:'center'
    },
    styleText:{
        fontSize:24
    },
    input:{
        textAlign: 'center',
        height: 50,
        fontSize: 18,
        width: '80%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        paddingHorizontal: 10
    },
    footerContainer:{
        flex: 0.2,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems: 'flex-end'
    },
    button: {
        fontSize: 22,
        paddingHorizontal: 25,
        marginHorizontal: '10%',
        //margin: 80,
        backgroundColor: '#495E57',
        borderColor: '#495E57',
        borderWidth: 2,
        borderRadius: 8
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 24,
    },

})