import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { LandingScreen } from '../screens/LandingScreen';
import { Home } from '../screens/Home';
import { VideoUploadScreen } from '../screens/VideoUploadScreen';

type RootStackParamList = {
    Home: undefined;
    VideoUpload: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const InitialNavigator: FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                headerTintColor: '#000000',
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="VideoUpload"
                component={VideoUploadScreen}
                options={{
                    title: 'Upload Video',
                }}
            />
        </Stack.Navigator>
    );
};

const Navigator: FC = () => {
    return (
        <NavigationContainer>
            <InitialNavigator />
        </NavigationContainer>
    );
};

export default Navigator;
