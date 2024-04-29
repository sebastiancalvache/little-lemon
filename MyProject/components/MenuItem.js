import { Text, View, Image, StyleSheet } from "react-native";

export default function MenuItem({item}){
    return(
        <View style={MenuItemStyles.container}>
            <Text style={MenuItemStyles.name}>{item.name}</Text>
            <View style={MenuItemStyles.content}>
                <View style={MenuItemStyles.textContent}>
                    <Text numberOfLines={2} style={MenuItemStyles.description}>
                        {item.description}
                    </Text>
                    <Text style={MenuItemStyles.price}>
                        ${item.price}
                    </Text>
                </View>
                <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image=='lemonDessert.jpg'?'lemonDessert 2.jpg':item.image}?raw=true` }} resizeMode="cover" style={{ width: 100, height: 100 }} />
            </View>
        </View>
    )
}

const MenuItemStyles = StyleSheet.create({
    container: { 
        flex: 1, 
        marginVertical: 15 
    },
    name: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        fontFamily: 'Markazi' 
    },
    content: { 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 10 
    },
    textContent: { 
        flexDirection: 'column', 
        flex: 1, 
        gap: 10, 
        justifyContent: 'center' 
    },
    description: { 
        fontSize: 15,
        fontFamily: 'Karla' 
    },
    price: { 
        fontSize: 15, 
        fontWeight: 'bold', 
        fontFamily: 'Markazi' 
    }
})