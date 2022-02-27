import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


export default function BlogCard({ title = 'Title', varient = 'Default', imageUrl = 'https://images.wallpapersden.com/image/download/avengers-endgame-2019-movie_a2loaGWUmZqaraWkpJRmZWdprWxrbQ.jpg' }) {

    let containerStyle = [styles.cardContainer]
    let imageStyle = [styles.image]
    let titleStyle = [styles.blogTitle]

    if (varient === 'varient-2') {
        let borderRadius = {
            borderRadius: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
        }
        containerStyle.push(borderRadius)
        imageStyle.push(borderRadius)

        let titleBorderRadius = {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        }
        titleStyle.push(titleBorderRadius)
    }else if (varient === 'varient-3') {
        let borderRadius = {
            borderRadius: 0,
            borderTopLeftRadius: 25,
            borderBottomRightRadius: 25,
        }
        containerStyle.push(borderRadius)
        imageStyle.push(borderRadius)

        let titleBorderRadius = {
            borderBottomLeftRadius: 0,
        }
        titleStyle.push(titleBorderRadius)
    }


    return (
        <View style={containerStyle}>
            <TouchableWithoutFeedback>
                <Ionicons
                    name='ios-ellipsis-vertical-circle'
                    size={32}
                    color='white'
                    style={styles.icon}
                />
            </TouchableWithoutFeedback>

            <View>

                <Image
                    style={imageStyle}
                    source={{
                        uri: imageUrl
                    }}
                />
            </View>
            <View >
                <Text style={titleStyle}>{title}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        borderWidth: 1,
        borderColor: '#d9d9d9',
        marginBottom: 10,
        borderRadius: 25

    },
    image: {
        width: 290,
        height: 175,
        borderRadius: 25
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
        width: '100%',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 14,
        zIndex: 10
    },

})