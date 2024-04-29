import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{ useContext, useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView } from "react-native";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";

export default function OnBoarding(){
    const [email, changeEmail] = useState('');
    const [name, changeName] = useState('');   
    const { setIsLoggedIn, setUserInfo} = useContext(UserContext);

    return(
        <>
        <Header></Header>
        <KeyboardAvoidingView style={{flex:1}}>
        <View style={onBoardingStyles.container}>
            
            <View style={onBoardingStyles.formContainer}>
                <View style={onBoardingStyles.titleContainer}>
                    <Text style={onBoardingStyles.styleText}>Let us get to know you</Text>
                </View>
                <View style={onBoardingStyles.inputsContainer}>
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
                        const personalInfo = 
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
                            };
                        await AsyncStorage.multiSet([['@loggedIn', 'true'], ['@personal_info',  JSON.stringify(personalInfo)]]);
                        setUserInfo(personalInfo);
                        setIsLoggedIn(true);
                    }}
                    disabled={email == '' || name == ''}
                >
                <Text style={onBoardingStyles.buttonText}>{'Next'}</Text>
            </Pressable>
            </View>
        </View>
        </KeyboardAvoidingView>
        </>
    );

}

const onBoardingStyles = StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
    },
    titleContainer:{
        height:'60%', 
        alignItems:'center', 
        paddingTop:'10%',
        fontFamily:'Karla'
    },
    formContainer:{
        height:'80%',
        flexDirection:'column',
        backgroundColor: '#495E57',
    },
    inputsContainer:{
        alignItems:'center',
        justifyContent:'flex-end', 
        height:'40%', 
        paddingBottom:'8%',
        flexDirection:'column',
        gap:5
    },
    styleText:{
        fontSize:24,
        fontFamily:'Karla'
    },
    input:{
        textAlign: 'center',
        height: 50,
        fontSize: 18,
        width: '80%',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontFamily:'Karla'
    },
    footerContainer:{
        justifyContent:'center', 
        alignItems:'flex-end', 
        height:'20%'
    },
    button: {
        fontSize: 22,
        paddingHorizontal: 25,
        marginHorizontal: '10%',
        backgroundColor: '#495E57',
        borderColor: '#495E57',
        borderWidth: 2,
        borderRadius: 8
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 24,
        fontFamily:'Karla'
    },

})