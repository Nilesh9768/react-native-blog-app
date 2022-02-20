import { View, Text, Button, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import BlogCard from './BlogCard'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { baseUrl } from './utils';

export default function HomeScreen({ navigation }) {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    const getBlogs = async () => {
        console.log('fetching blogs...')
        try {
            const response = await fetch(`${baseUrl}/allblogs`)
            const data = await response.json()
            setBlogs(data.blogs)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getBlogs();
    }, [])

    return (
        <View style={styles.homeContainer}>
            {!loading ?
                <View style={styles.homeContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>My Blogs</Text>
                    </View>

                    <View style={styles.list}>
                        <FlatList
                            data={blogs}
                            renderItem={(item) => (
                                <BlogCard item={item} navigation={navigation} getBlogs={getBlogs} />
                            )}

                            keyExtractor={(item) => item._id}
                        />
                    </View>
                    <Ionicons
                        name='add-circle-sharp'
                        size={54}
                        color='black'
                        onPress={() => navigation.navigate('BlogForm', { blog: undefined })}
                    />
                </View> :
                <ActivityIndicator size={'large'} color='rgba(0,0,0,0.8)' />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    headerContainer: {
        width: 310
    },
    header: {
        fontSize: 30,
        fontWeight: "bold"
    },
    list: {
        flex: 1,
        marginTop: 10
    }
});