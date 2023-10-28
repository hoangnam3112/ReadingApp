import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getBooksApi } from '../../services/authentication';

const LibraryScreen = ({ navigation }: any) => {

    return (
        <View style={styles.container}>
            <Text>Danh sách đọc</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
    },

})

export default LibraryScreen;