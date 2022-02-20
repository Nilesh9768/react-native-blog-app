import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { baseUrl } from './utils';

export default function BlogCard({ item, navigation, getBlogs }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const blog = item.item

    const handleDelete = async () => {

        try {

            console.log('deleting...')
            const response = await fetch(`${baseUrl}/${blog._id}/delete`, {

                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const res = await response.json()

            console.log(res)
            getBlogs()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Blog', { blog })}>
            <View style={styles.cardContainer}>
                <TouchableWithoutFeedback
                    onPress={() => setIsModalOpen(true)}
                >
                    <Ionicons
                        name='ios-ellipsis-vertical-circle'
                        size={32}
                        color='white'
                        style={styles.icon}
                    />
                </TouchableWithoutFeedback>

                <Modal
                    visible={isModalOpen}
                    transparent={true}
                >
                    <View style={styles.modalViewContainer}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('BlogForm', {
                                        blog
                                    })
                                    setIsModalOpen(false)
                                }}
                            >
                                <Text style={styles.modalText}>Update</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    handleDelete()
                                    setIsModalOpen(false)
                                }}
                            >
                                <Text style={styles.modalText}>Delete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsModalOpen(false)}
                            >
                                <Text style={styles.modalText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View>

                    <Image
                        style={styles.image}
                        source={{
                            uri: blog.thumbnail
                        }}
                    />
                </View>
                <View >
                    <Text style={styles.blogTitle}>{blog.title}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        borderWidth: 1,
        borderColor: '#d9d9d9',
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20

    },
    image: {
        width: 290,
        height: 175,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    blogTitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 5,
        paddingVertical: 10,
        position: 'absolute',
        bottom: -5,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.65)',
        width: '100%'
    },
    description: {
        width: 200
    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 14,
        zIndex: 10
    },
    modalViewContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 10
    },
    modalText: {

        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3,
        textAlign: 'center',
        backgroundColor: 'purple',
        borderRadius: 5,
        marginVertical: 10
    },

})