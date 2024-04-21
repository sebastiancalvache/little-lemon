import { View, Text, StyleSheet, Image, Pressable, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import Checkbox from 'expo-checkbox';
import { useState } from "react";

export default function Profile(){
    const [isChecked, setChecked] = useState(false);
    return(
        <ScrollView style={ProfileStyles.container}>
            <View style={ProfileStyles.logo}>

                <Image style={ProfileStyles.img} source={require('../assets/Logo.png')} resizeMode='stretch'></Image>
                <Image style={ProfileStyles.profileImg} source={require('../assets/Profile.png')} resizeMode='stretch' ></Image>
            </View>
            <View style={ProfileStyles.personalInfo}>

                <Text style={ProfileStyles.subtitle}>Personal Information</Text>

                
                <View style={ProfileStyles.avatar}>
                    <Text style={ProfileStyles.label}>Avatar</Text>
                    <View style={ProfileStyles.avatarRow}>
                        <Image style={ProfileStyles.avatarImg} source={require('../assets/Profile.png')} resizeMode='stretch' ></Image>
                        <Pressable
                            style={ProfileStyles.button}
                            onPress={async () => {

                            }}
                        >
                            <Text style={[ProfileStyles.buttonText]}>{'Change'}</Text>
                        </Pressable>
                        <Pressable
                            style={[ProfileStyles.button,{backgroundColor:'white', borderBlockColor:'#495E57'}]}
                            onPress={async () => {

                            }}
                        >
                            <Text style={[ProfileStyles.buttonText,{color:'#495E57'}]}>{'Remove'}</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>First Name</Text>
                    <TextInput style={ProfileStyles.input} placeholder="First name" textAlign="left">
                    </TextInput>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>Last Name</Text>
                    <TextInput style={ProfileStyles.input} placeholder="Last name" textAlign="left">
                    </TextInput>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>Email</Text>
                    <TextInput style={ProfileStyles.input} placeholder="Email" textAlign="left" keyboardType="email-address">
                    </TextInput>
                </View>

                <View style={ProfileStyles.textInput}>
                    <Text style={ProfileStyles.label}>Phone number</Text>
                    <TextInput style={ProfileStyles.input} placeholder="Phone number" textAlign="left" keyboardType="phone-pad">
                    </TextInput>
                </View>

                <Text style={ProfileStyles.subtitle}>Email notifications</Text>

                <View style={ProfileStyles.checkboxContainer}>
                <Checkbox
                    style={ProfileStyles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Order statuses</Text>
                </View>
                <View style={ProfileStyles.checkboxContainer}>
                <Checkbox
                    style={ProfileStyles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Password changes</Text>
                </View>
                <View style={ProfileStyles.checkboxContainer}>
                <Checkbox
                    style={ProfileStyles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Special Offers</Text>
                </View>
                <View style={ProfileStyles.checkboxContainer}>
                <Checkbox
                    style={ProfileStyles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#495E57' : undefined}
                    />
                    <Text style={ProfileStyles.checkLabel}>Newsletter</Text>
                </View>

                <Pressable
                    style={ProfileStyles.logoutButton}
                    onPress={async () => {

                    }}
                >
                    <Text style={[ProfileStyles.buttonText, { color: 'black' }]}>{'Log out'}</Text>
                </Pressable>



            <View style={ProfileStyles.bottomButtons}>
            <Pressable
                    style={[ProfileStyles.button, { backgroundColor: 'white', borderBlockColor: '#495E57' }]}
                    onPress={async () => {

                    }}
                >
                    <Text style={[ProfileStyles.buttonText, { color: '#495E57' }]}>{'Discard Changes'}</Text>
                </Pressable>                
                <Pressable
                    style={ProfileStyles.button}
                    onPress={async () => {

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
    logo:{
        height:80,
        flexDirection:'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    img:{
        width: '60%',
        height: '65%'
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
        //width:'5000%'
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
    }
});