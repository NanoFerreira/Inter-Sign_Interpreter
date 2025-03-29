import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native';
import PaginationDots from '../resources/components/PaginationDots';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    VideoUpload: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type PageContent = {
    text1: string;
    text2: string;
    img: any;
};

type Pages = {
    [key: number]: PageContent;
};

const Home = () => {
    const navigation = useNavigation<NavigationProp>();
    const totalDots = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const pages: Pages = {
        0: {
            text1: 'Get Live Interpretations',
            text2: 'Record your signs to receive real-time interpretations.',
            img: require('../resources/images/image1.png'),
        },
        1: {
            text1: 'Train the AI',
            text2: 'Teach the model your signs to improve its understanding.',
            img: require('../resources/images/image2.png'),
        },
        2: {
            text1: 'Choose a Language',
            text2: 'Select the spoken language for interpretations.',
            img: require('../resources/images/image3.png'),
        },
    };

    const nextPage = () => {
        if (currentPage === totalDots - 1) {
            navigation.navigate('VideoUpload');
        } else {
            setCurrentPage((prev) => (prev + 1) % totalDots);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View
                style={{
                    flex: 1, // Centraliza verticalmente
                    alignItems: 'center', // Centraliza horizontalmente
                    paddingHorizontal: 20,
                }}
            >
                <Text
                    style={{
                        marginTop: 100,
                        color: '#000000',
                        fontSize: 30,
                        textAlign: 'center', // Centraliza o próprio texto dentro do Text
                        marginBottom: 10,
                        fontWeight: 'bold',
                    }}
                >
                    {pages[currentPage].text1}
                </Text>
                <Text
                    style={{
                        color: '#000000',
                        fontSize: 19,
                        textAlign: 'center', // Centraliza o próprio texto dentro do Text
                        marginBottom: 10,
                    }}
                >
                    {pages[currentPage].text2}
                </Text>
                <Image source={pages[currentPage].img} style={{ width: 400, height: 400 }} />
                <PaginationDots totalDots={totalDots} currentPage={currentPage} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={nextPage}>
                    <Text style={{ color: '#23ABC1', fontSize: 18, fontWeight: 'bold' }}>
                        {currentPage === totalDots - 1 ? 'Start' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export { Home };

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    profilePicture: {
        flexDirection: 'row',
        //right: 20, // Adjust the distance from the right
        width: 44, // Width of the image
        height: 44, // Height of the image
        borderRadius: 20, // Make the image circular
        borderWidth: 2, // Optional border for styling
        borderColor: 'white', // Optional border color
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        alignSelf: 'flex-start',
        left: -15,
        fontSize: 28,
        color: '#222',
        marginBottom: 10,
    },
    icons: {
        flexDirection: 'row',
        gap: 15, // Space between icons
    },

    slider: {
        width: '85%',
        height: 1,
    },
    smallBtn: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        width: 22,
        height: 22,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityDropdown: {
        backgroundColor: '#FFF1C9',
        width: 277,
        height: 132,
        top: 5,
        borderRadius: 10,
        marginBottom: 15,
    },
    city: {
        flexDirection: 'row',
        left: 10,
        top: 5,
        marginTop: 10,
    },
    TypeDropdown: {},
    selectCity: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#0000004D',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    dropdown: {
        marginBottom: 10,

        color: '#000000',
        fontSize: 16,
    },
    largeBtn: {
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 113,
        height: 43,
        borderRadius: 30,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,

        //flex: 1,
        marginBottom: 10,
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    accommodationContainer: {
        flexDirection: 'column',
        left: 15,
    },
    accomodationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginRight: '15%',
    },
    counter: {
        fontSize: 12,
        marginHorizontal: 5,
    },
    changeCounterBtn: {
        alignItems: 'center',
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
});
