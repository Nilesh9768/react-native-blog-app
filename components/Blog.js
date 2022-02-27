import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Blog({ route }) {


  const { blog } = route.params

  return (
    // <View style={styles.blogContainer}>
    //   <Text style={styles.title}>{blog.title}</Text>
    //   <Image

    //     style={styles.image}
    //     source={{
    //       uri: blog.thumbnail
    //     }}
    //   />

      <ScrollView style={{ flex: 1}} contentContainerStyle={styles.blogContainer}>
        <Text style={styles.title}>{blog.title}</Text>
        <Image

          style={styles.image}
          source={{
            uri: blog.thumbnail
          }}
        />
        <Text style={styles.content}>{blog.content}</Text>
      </ScrollView>

    // </View>
  )
}

const styles = StyleSheet.create({

  blogContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {

    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.9)',
    paddingTop:10,
    paddingBottom:8,
    width:360,
    paddingHorizontal:10
  },
  image: {
    width: 340,
    height: 300
  },

  content: {
    width: 380,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'justify'
  }
})