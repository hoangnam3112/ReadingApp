import React, { useEffect } from 'react'
import { useState } from "react"
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';

const Logo = ({ navigation }: any) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('AdminUser');
        }, 4000);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logoApp.png')}
                resizeMode="cover"
            />
            <ActivityIndicator style={styles.loading} size="large" color="#ff500a"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
       
    },
    loading: {
        marginTop: 20,
    },
})

export default Logo