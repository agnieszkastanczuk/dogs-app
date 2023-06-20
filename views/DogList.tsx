import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
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
        } catch (error) {
            console.error(error);
        }
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
        <View style={styles.breedItem}>
            <Text>{item}</Text>
        </View>
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
});

export default DogList;
