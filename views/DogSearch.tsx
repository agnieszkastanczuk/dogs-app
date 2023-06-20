
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'

const api = process.env.API_URL;

const DogSearch = () => {
    const [breed, setBreed] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const searchDogImage = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${api}/breed/${breed}/images/random`);
            const { data } = response;
            const imageUrl = data.message;
            setImageUrl(imageUrl);
            setError('');
        } catch (error) {
            setImageUrl('');
            setError('There is no such breed of dog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Search breed:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setBreed}
                value={breed}
                placeholder="Write the breed of dog"
            />
            <Button title="Search" onPress={searchDogImage} />
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="blue" />
            ) : imageUrl ? (
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                </View>
            ) : (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    errorText: {
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
    loader: {
        marginTop: 20,
    },
});

export default DogSearch;
