import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export default function Header({ navigation }) {

    const { userInfo, isLoggedIn } = useContext(UserContext);

    return (
        <View style={headerStyles.logo}>
            <View style={headerStyles.img}>
                <Image source={require('../assets/Logo.png')} resizeMode='stretch'></Image>
            </View>
            <View style={{ width: '12%' }}>
                {isLoggedIn && <TouchableOpacity style={{ height: '100%', justifyContent: 'center' }} onPress={() => { navigation.navigate('Profile') }}>
                    {userInfo.profileImage == '' ?
                        <Text style={[headerStyles.emptyPictureHeader]}>{userInfo.firstName.slice(0, 1).concat(userInfo.lastName.slice(0, 1))}</Text> :
                        <Image source={{ uri: userInfo.profileImage }} style={headerStyles.avatarImgHeader} resizeMode='stretch' />}
                </TouchableOpacity>}

            </View>

        </View>
    );
}

const headerStyles = StyleSheet.create({
    logo: {
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    img: {
        width: '87%', 
        paddingLeft: '10%', 
        alignItems: 'center'
    },
    emptyPictureHeader: {
        fontSize: 24,
        borderRadius: 100,
        backgroundColor: '#F4CE14',
        padding: 10,
    },
    avatarImgHeader: {
        height: '70%',
        borderRadius: 200,
    }
})