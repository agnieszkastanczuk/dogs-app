import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'

interface DogListProps {
    item: string;
}

const api = process.env.API_URL;

const DogList = () => {
    const [dogBreeds, setDogBreeds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchDogBreeds(page);
    }, [page]);

    let breeds: string[];

    const fetchDogBreeds = async (currentPage: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${api}/breeds/list/all`);
            breeds = Object.keys(response.data.message).slice(0, currentPage * 10);
            setDogBreeds(breeds);
            if (breeds.length === 0) {
                setIsLoading(false);
            }
            return breeds;
        } catch (error) {
            console.error(error);
        }
    };

    const [dogImage, setDogImage] = useState('');
    const fetchDogImage = async (breed: string) => {
        try {
            const response = await axios.get(`${api}/breed/${breed}/images/random`);
            setDogImage(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };


    const onPress = (breed: string) => {
        setDogImage('');
        fetchDogImage(breed);
        console.log(breed)
    };


    const loadMoreBreeds = () => {
        const nextPage = page + 1;
        if (page + 1 <= 10) {
            setTimeout(() => {
                setPage(nextPage);
                setIsLoading(true);
            }, 1000);
        } else {
            setIsLoading(false);
        }
    };

    const renderBreeds = ({ item }: { item: string }) => (
        <TouchableOpacity style={styles.breedItem} onPress={() => onPress(item)}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        if (!isLoading) {
            return (
                <View style={styles.footerContainer}>
                    <Text>Nic do załadowania</Text>
                </View>
            );
        }
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Breeds list:
            </Text>
            <FlatList
                style={styles.breedList}
                data={dogBreeds}
                keyExtractor={(item) => item}
                renderItem={renderBreeds}
                onEndReachedThreshold={0.01}
                onEndReached={loadMoreBreeds.bind(this)}
                //onEndReached={loadMoreBreeds}
                ListFooterComponent={renderFooter}
            />
            <Text style={styles.dogImageText}>To see a sample photo of the breed click on the name:
            </Text>
            <Image source={{ uri: dogImage }} style={styles.dogImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    breedList: {
        height: 500,
    },
    breedItem: {
        marginBottom: 16,
        height: 32,
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    dogImageText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dogImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    }
});

export default DogList;
