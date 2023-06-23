import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query'
import { getBreedsPaginated } from '../api/breeds';

const DogListWithRQ = () => {
    // const { data: breeds, isLoading, isError, error } = useQuery({
    //     queryKey: ['breeds'],
    //     queryFn: getBreeds,
    // });

    const {
        status,
        error,
        data,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery<{
        nextPage?: number;
        previousPage?: number;
        message?: any;
    }>({
        queryKey: ["breeds", "infinite"],
        getNextPageParam: prevData => prevData.nextPage,
        queryFn: ({ pageParam = 1 }) => getBreedsPaginated(pageParam),
    })


    if (isLoading) return <Text>Loading...</Text>
    if (isError) {
        return <pre>{JSON.stringify(error)}</pre>
    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Breeds list:
            </Text>
            <View style={styles.breedList} >
                {data.pages
                    .flatMap(pageData => pageData.message)
                    .map((breed) => (
                        <Text style={styles.breedItem} key={breed}>{breed}</Text>
                    ))}
                {hasNextPage && (
                    <TouchableOpacity onPress={() => fetchNextPage()}>
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    breedList: {
        height: 400,
    },
    breedItem: {
        marginBottom: 16,
        height: 32,
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default DogListWithRQ;


            // {breeds && Object.keys(breeds).map((breed) => (
            //     <Text key={breed}>{breed}</Text>
            // ))}
