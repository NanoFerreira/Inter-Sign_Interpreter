import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {
    launchImageLibrary,
    ImagePickerResponse,
    ImageLibraryOptions,
} from 'react-native-image-picker';
import Video from 'react-native-video';

const VideoUploadScreen = () => {
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const pickVideo = async () => {
        try {
            const options: ImageLibraryOptions = {
                mediaType: 'video',
                selectionLimit: 1,
                includeBase64: false,
            };

            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                Alert.alert('Cancelled', 'Video selection was cancelled');
                return;
            }

            if (result.errorCode) {
                Alert.alert('Error', `Failed to pick video: ${result.errorMessage}`);
                return;
            }

            if (result.assets && result.assets[0].uri) {
                setVideoUri(result.assets[0].uri);
                setResult(null); // Clear previous results
            }
        } catch (err) {
            console.error('Error picking video:', err);
            Alert.alert('Error', 'Failed to pick video. Please try again.');
        }
    };

    const processVideo = async () => {
        if (!videoUri) {
            Alert.alert('Error', 'Please select a video first');
            return;
        }

        setIsProcessing(true);

        try {
            // Create form data to send the video
            const formData = new FormData();
            formData.append('video', {
                uri: videoUri,
                type: 'video/mp4',
                name: 'video.mp4',
            });

            console.log('Sending video to server:', videoUri);

            // Call the Flask API
            const response = await fetch('http://localhost:8082/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to process video: ${errorText}`);
            }

            const data = await response.json();
            console.log('Server response:', data);

            // Set the result to the prediction
            if (data.prediction) {
                setResult(data.prediction);
            } else {
                setResult('No prediction available');
            }
        } catch (err) {
            console.error('Error processing video:', err);
            Alert.alert('Error', 'Failed to process video');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Upload Sign Language Video</Text>

                {videoUri ? (
                    <View style={styles.videoContainer}>
                        <Video
                            source={{ uri: videoUri }}
                            style={styles.video}
                            resizeMode="contain"
                            controls
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.processButton]}
                            onPress={processVideo}
                            disabled={isProcessing}
                        >
                            <Text style={styles.buttonText}>
                                {isProcessing ? 'Processing...' : 'Process Video'}
                            </Text>
                        </TouchableOpacity>
                        {result && (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultTitle}>Interpretation Result:</Text>
                                <Text style={styles.resultText}>{result.prediction}</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={pickVideo}>
                            <Text style={styles.buttonText}>Select Video from Photos</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export { VideoUploadScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 500,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#000000',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    videoContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#23ABC1',
        padding: 15,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
    },
    processButton: {
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        width: '100%',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
    resultText: {
        fontSize: 16,
        color: '#000000',
        lineHeight: 24,
    },
});
