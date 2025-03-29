import { createContext, useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { LandingScreen } from '../screens/LandingScreen';

type UIProviderProps = {
    children: React.ReactNode;
};

const UIContext = createContext({
    showApiLoader: (_value: boolean) => {
        return;
    },
    showLandingScreen: (_value: boolean) => {
        return;
    },
});

export const UIProvider = (props: UIProviderProps) => {
    const [showLandingScreen, setShowLandingScreen] = useState(true);
    const [showApiLoader, setShowApiLoader] = useState(false);

    const renderApiLoader = () => {
        return (
            <View style={styles.absoluteContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };

    const renderLandingScreen = () => {
        return <LandingScreen />;
    };

    return (
        <UIContext.Provider
            value={{ showLandingScreen: setShowLandingScreen, showApiLoader: setShowApiLoader }}
        >
            {showApiLoader && renderApiLoader()}
            {showLandingScreen && renderLandingScreen()}
            {props.children}
        </UIContext.Provider>
    );
};

export const useUIElements = () => useContext(UIContext);

const styles = StyleSheet.create({
    absoluteContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5000,
        elevation: 5000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    imageContainer: { width: 90, height: 90 },
});
