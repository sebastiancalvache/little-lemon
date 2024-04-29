import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { UserContext } from '../context/UserContext';
import FilterMenuButton from '../components/FilterMenuButton';
import MenuItem from '../components/MenuItem';
import Header from '../components/Header';
import { getMenuItems, debounce } from '../services/menuService';



export default function Home({ navigation }) {
    const { setMenu, categories, menu, filters,setCategories } = useContext(UserContext);
    const [localMenu, setLocalMenu] = useState('');
    const [editSearchText, setEditSearchText] = useState(false);
    const [matchText, setMatchText] = useState('');

    const menuItemRender = ({ item }) => (<MenuItem item={item}></MenuItem>);
    const menuItemSeparator = () => (<View style={{

        height: 1,
        width: '100%',
        backgroundColor: 'lightgray',
    }} />);

    

    const setNewMenu = async () => {
        
        const newMenuItems = await getMenuItems(filters, editSearchText?matchText:'');
        if(JSON.stringify(newMenuItems)!== localMenu)
        {
            setMenu(newMenuItems);
            setLocalMenu(JSON.stringify(newMenuItems));
            if(categories.length == 0)
            {
                let categories = [];
                newMenuItems.map((item) =>{
                 if(categories.indexOf(item.category) == -1) categories.push(item.category);
               });
               setCategories(categories);
            }
        }

    }

    const debouncedFilterMenu = debounce(setNewMenu, 500);

    useEffect(() => {
        debouncedFilterMenu();
    });


    return (
        <>
            <View style={HomeStyles.container}>
                <Header navigation={navigation}></Header>
                <View style={HomeStyles.intro}>
                    <Text style={HomeStyles.introTitle}>Little Lemon</Text>

                    <View style={HomeStyles.paragraphContainer}>
                        <View style={{ width: '65%' }}>
                            <Text style={HomeStyles.introSubtitle}>Chicago</Text>
                            <Text style={HomeStyles.paragraph}>
                                We are a family owned Maditerranean restauran, focused on tradition recipes served with a modern twist</Text>
                        </View>

                        <Image source={require('../assets/Hero image.png')} style={HomeStyles.heroImg} resizeMode='stretch'></Image>
                    </View>

                    <View style={[HomeStyles.searchView,editSearchText?{backgroundColor:'white',borderRadius:16}:{}]}>
                        <View style={HomeStyles.searchContainer}>
                            <TouchableOpacity style={HomeStyles.touchable} onPress={() => { setEditSearchText(!editSearchText) }}>
                                <Image source={require('../assets/searchIcon.png')} style={HomeStyles.searchIcon} resizeMode='stretch'>
                                </Image>
                            </TouchableOpacity>
                            
                        </View>
                        {editSearchText &&
                        <TextInput style={HomeStyles.searchText} onChangeText={setMatchText} value={matchText}></TextInput>}
                    </View>


                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 25 }}>
                    <Text style={{ fontFamily: 'Karla', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
                        ORDER FOR DELIVERY!
                    </Text>
                    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, marginVertical: 10 }}>
                        {categories.map((category, index) => {
                            return (
                                <FilterMenuButton key={index} filterName={category}></FilterMenuButton>
                            )
                        })}

                    </ScrollView>


                </View>
                <View style={{

                    height: 1,
                    width: '95%',
                    backgroundColor: 'gray',
                    alignSelf: 'center'
                }} />
                <FlatList
                    style={{ margin: 10 }}
                    data={menu} renderItem={menuItemRender}
                    keyExtractor={(item, index) => item.name + index}
                    ItemSeparatorComponent={menuItemSeparator}
                >

                </FlatList>

            </View>


        </>
    );
}

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    img: {
        width: '60%',
        height: '65%',
        marginRight: '9%'
    },
    emptyPictureHeader: {
        fontSize: 26,
        borderRadius: 100,
        backgroundColor: '#F4CE14',
        padding: 10,
        marginRight: '1%'
    },
    avatarImgHeader: {
        flex: 0.5,
        height: 60,
        borderRadius: 200,
    },
    intro: {
        //height: '50%',
        padding: 10,
        backgroundColor: '#495E57',
    },
    introTitle: {
        fontSize: 60,
        color: '#F4CE14',
        fontFamily: 'Markazi',
    },
    introSubtitle: {
        fontSize: 40,
        color: 'white',
        marginBottom: 15,
        fontFamily: 'Markazi'
    },
    paragraph: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Karla'
    },
    searchIcon: {
        height: 20,
        width: 20,
    },
    searchContainer: {
        borderRadius: 100,
        backgroundColor: 'white',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImg: {
        height: '95%',
        width: '35%',
        borderRadius: 16
    },
    paragraphContainer: {

        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    searchView:{
        flexDirection:'row', 
        alignItems:'center', 
        marginTop:10
    },
    searchText:{
        height: '100%', 
        width: '90%', 
        borderRadius:16, 
        fontFamily:'Karla', 
        fontSize:20
    },
    touchable:{
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', 
        width: '100%'
    }
});