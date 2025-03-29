import React from 'react';
import { StyleSheet } from 'react-native';
import { UIProvider } from './app/hooks/UIProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './app/navigation/Navigator';

// @@iconify-code-gen
function App(): React.JSX.Element {
    return (
        <SafeAreaProvider>
            <UIProvider>
                <Navigator />
            </UIProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default App;
