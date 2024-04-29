import { View, Text, StyleSheet, Image, Pressable, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import  React, {useContext} from 'react';
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";


export default function Profile({navigation}){

    
  const {setIsLoggedIn, userInfo, setUserInfo, setMenu, setFilters, setCategories} = useContext(UserContext);

    const [form, changeForm] = useState({
        profileImage: '',
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        emailNotifications:{
            orderStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false
        }

    });

    useEffect(() => { 
        (async () => { 
          try{
            loadStorageValues();
          }
          catch(error)
          {
            console.error(`An error occurred: ${error.message}`);
          }
        })(); 
      }, []); 

      const loadStorageValues = async() => {
        value = userInfo;

        changeForm({
            profileImage: userInfo.profileImage,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone: userInfo.phone,
            emailNotifications: {
                orderStatuses: userInfo.emailNotifications.orderStatuses,
                passwordChanges: userInfo.emailNotifications.passwordChanges,
                specialOffers: userInfo.emailNotifications.specialOffers,
                newsletter: userInfo.emailNotifications.newsletter
            }
        });
      }

      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
          if (!result.canceled) {
              changeForm((prev) => ({
                  ...prev,
                  profileImage: result.assets[0].uri,
              })
              );
          }
      };      
    return(
        <ScrollView style={ProfileStyles.container}>
            <Header navigation={navigation}></Header>
            <View style={ProfileStyles.personalInfo}>

                <Text style={ProfileStyles.subtitle}>Personal Information</Text>

                
                <View style={ProfileStyles.avatar}>
                    <Text style={ProfileStyles.label}>Avatar</Text>
                    <View style={ProfileStyles.avatarRow}>
                        {form.profileImage !=='' && <Image source={{ uri: form.profileImage }} style={ProfileStyles.avatarImg} resizeMode='stretch'/>}
                        {form.profileImage =='' && <Text style={[ProfileStyles.emptyPicture]}>{form.firstName.slice(0,1).concat(form.lastName.slice(0,1))}</Text>}
                        
                        <Pressable
                            style={ProfileStyles.button}
                            onPress={async () => {
                                pickImage();
                            }}
                        >
                            <Text style={[ProfileStyles.buttonText]}>{'Change'}</Text>
                        </Pressable>
                        <Pressable
                            style={[ProfileStyles.button,{backgroundColor:'white', borderBlockColor:'#495E57'}]}
                            onPress={async () => {
                                changeForm((prev) => ({
                                    ...prev,
                                    profileImage: '',
                                })
                                );
                            }}
                        >
                            <Text style={[ProfileStyles.buttonText,{color:'#495E57'}]}>{'Remove'}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>First Name</Text>
                    <TextInput style={ProfileStyles.input} placeholder="First name" textAlign="left" value={form.firstName}
                        onChangeText={(value) => changeForm((prev) => ({
                            ...prev,
                            firstName: value,
                        })
                        )}>
                    </TextInput>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>Last Name</Text>
                    <TextInput style={ProfileStyles.input} placeholder="Last name" textAlign="left" value={form.lastName} 
                        onChangeText={(value) => changeForm((prev) => ({
                            ...prev,
                            lastName: value,
                        })
                    )}>
                    </TextInput>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>Email</Text>
                    <TextInput style={ProfileStyles.input} placeholder="Email" textAlign="left" keyboardType="email-address" value={form.email} 
                        onChangeText={(value) => changeForm((prev) => ({
                            ...prev,
                            email: value,
                        })
                    )}>
                    </TextInput>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>Phone number</Text>
                    <MaskedTextInput style={ProfileStyles.input}
                    textAlign="left"
                        mask='+1 999-999-9999'
                        keyboardType="phone-pad"
                        value={form.phone}
                        onChangeText={(formatted,extracted) => changeForm((prev) => ({
                            ...prev,
                            phone: extracted,
                        })
                    )}
                    />
                </View>

                <Text style={ProfileStyles.subtitle}>Email notifications</Text>

                <View style={ProfileStyles.checkboxContainer}>
                    <Checkbox
                        style={ProfileStyles.checkbox}
                        value={form.emailNotifications.orderStatuses}
                        onValueChange={(value) => changeForm((prev) => ({
                            ...prev,
                            emailNotifications: { ...prev.emailNotifications, orderStatuses: value }
                        })
                        )}
                        color={form.emailNotifications.orderStatuses ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Order statuses</Text>
                </View>
                <View style={ProfileStyles.checkboxContainer}>
                    <Checkbox
                        style={ProfileStyles.checkbox}
                        value={form.emailNotifications.passwordChanges}
                        onValueChange={(value) => changeForm((prev) => ({
                            ...prev,
                            emailNotifications: { ...prev.emailNotifications, passwordChanges: value }
                        })
                        )}
                        color={form.emailNotifications.passwordChanges ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Password changes</Text>
                </View>
                <View style={ProfileStyles.checkboxContainer}>
                <Checkbox
                    style={ProfileStyles.checkbox}
                    value={form.emailNotifications.specialOffers}
                    onValueChange={(value) => changeForm((prev) => ({
                        ...prev,
                        emailNotifications: { ...prev.emailNotifications, specialOffers: value }
                    })
                    )}
                    color={form.emailNotifications.specialOffers ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Special Offers</Text>
                </View>
                <View style={ProfileStyles.checkboxContainer}>
                <Checkbox
                    style={ProfileStyles.checkbox}
                    value={form.emailNotifications.newsletter}
                    onValueChange={(value) => changeForm((prev) => ({
                        ...prev,
                        emailNotifications: { ...prev.emailNotifications, newsletter: value }
                    })
                    )}
                    color={form.emailNotifications.newsletter ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Newsletter</Text>
                </View>

                <Pressable
                    style={ProfileStyles.logoutButton}
                    onPress={async () => {
                        await AsyncStorage.setItem('@loggedIn', 'false');
                        setIsLoggedIn(false);
                        setUserInfo(null);
                        setMenu([]);
                        setFilters([]);
                        setCategories([]);
                    }}
                >
                    <Text style={[ProfileStyles.buttonText, { color: 'black' }]}>{'Log out'}</Text>
                </Pressable>



            <View style={ProfileStyles.bottomButtons}>
            <Pressable
                    style={[ProfileStyles.button, { backgroundColor: 'white', borderBlockColor: '#495E57' }]}
                    onPress={async () => {
                        loadStorageValues();
                    }}
                >
                    <Text style={[ProfileStyles.buttonText, { color: '#495E57' }]}>{'Discard Changes'}</Text>
                </Pressable>                
                <Pressable
                    style={ProfileStyles.button}
                    onPress={async () => {
                        setUserInfo(form);
                        await AsyncStorage.setItem( '@personal_info', JSON.stringify(form));
                    }}
                >
                    <Text style={[ProfileStyles.buttonText]}>{'Save Changes'}</Text>
                </Pressable>

            </View>

            </View>
            

        </ScrollView>
    );
}

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileImg:{
        width: '15%',
        height:'80%',
        marginLeft:'9%',
        marginRight:'1%'
    },
    personalInfo: {
        flex: 0.8, 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: '3%',
        paddingVertical: '5%',
        flexDirection:'column',
        gap:20
    },
    avatarImg:{
        flex:0.4,
        height:80,
        borderRadius:200,
    },
    button: {
        fontSize: 12,
        backgroundColor: '#495E57',
        borderColor: '#495E57',
        borderWidth: 2,
        borderRadius: 8,
        justifyContent:'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    avatar:{ 
        width:'100%',
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        flexDirection:'column', 
    },
    avatarRow: {
        flexDirection: 'row',
        gap: 20,
        justifyContent:'center',
        alignItems:'center',        
    },
    label: {
        color: 'gray',
        fontSize:12,
        marginBottom: 5
    },
    input:{
        textAlign: 'center',
        height: 50,
        fontSize: 18,
        width: '100%',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10
    },
    textInput: {
        flexDirection: 'column',
        width: '100%'
    },
    checkboxContainer: {
        flexDirection: 'row'
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkLabel: {
        margin: 8,
    },
    logoutButton: { 
        backgroundColor: '#F4CE14', 
        borderBlockColor: '#F4CE14', 
        borderColor: '#F4CE14', 
        borderRadius: 8, 
        width:'100%'
    },
    bottomButtons: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 30, 
        width: '100%' 
    },
    subtitle:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    emptyPicture:{
        fontSize:26,
        borderRadius:100,
        backgroundColor: '#F4CE14', 
        padding:20
    },
    emptyPictureHeader:{
        fontSize:26,
        borderRadius:100,
        backgroundColor: '#F4CE14', 
        padding:10,
        marginRight:'1%'
    }
});