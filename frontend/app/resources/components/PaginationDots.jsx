// PaginationDots.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const PaginationDots = ({ totalDots, currentPage }) => {
    return (
        <View style={styles.dotContainer}>
            {Array.from({ length: totalDots }).map((_, index) => (
                <View key={index} style={[styles.dot, currentPage === index && styles.activeDot]} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'white', // Inactive dot color
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#23ABC1',
    },
    activeDot: {
        backgroundColor: '#23ABC1', // Active dot color
    },
});

export default PaginationDots;
