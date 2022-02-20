import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from './utils';
// import * as firebase from 'firebase';
// import {firebaseConfig} from '../firebase'
export default function BlogForm({ navigation, route }) {


  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('');
  const { blog } = route ? route.params : undefined


  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // }
  const uploadImage = async () => {

    // const ref = firebase
    //   .storage()
    //   .ref()
    //   .child(new Date());
    // const snapshot = await ref.put(image);

    // console.log(snapshot)
    // const url = await snapshot.ref.getDownloadURL();
    // setThumbnail(url)
    // console.log('Uploading...')


    console.log('Uploading...')
        const data = new FormData()
        data.append('file', image)
        data.append('blog-app-preset', 'blog_thumbnail')
        // console.log(blob,'blob')
        try {
            var res = await fetch('https://api.cloudinary.com/v1_1/nileshyadavcloud/image/upload', {
                method: "post",
                body: data
            })
            const img = await res.json()
            const url = img.secure_url
            console.log(url)
        } catch (error) {
            console.log(error)
        }
  }
  const postBlogData = async () => {

    console.log('post')
    let url = blog ? `${baseUrl}/${blog._id}/edit` : `${baseUrl}/createBlogs`
    let method = blog ? 'put' : 'post';


    try {

      const newBlog = JSON.stringify({

        title,
        // thumbnail,
        content
      })

      const resp = await fetch(url, {

        method: `${method}`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: newBlog,
      })

      const res = await resp.json()
      console.log(res)
      navigation.push('Home')
    } catch (error) {
      console.log(error)
    }

  }



  const handleChooseImage = async () => {
    console.log('handlechoose')
    try {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log(result);

      if (!result.cancelled) {
        console.log('yes')

        const response = await fetch(result.uri);
        // console.log(JSON.stringify(response))
        const blob = await response.blob();
        console.log(JSON.stringify(blob), 'blob')
        setImage(blob);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (blog !== undefined) {
      setTitle(blog.title)
      setContent(blog.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [])

  return (
    <View style={styles.formContainer}>

      <View style={{ flexDirection: 'row', width: 300 }}>
        <Text style={styles.header}>Create A Blog</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder='Title'
        onChangeText={(val) => setTitle(val)}
        value={title}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder='Content goes here..'
        multiline={true}
        numberOfLines={9}
        onChangeText={(val) => setContent(val)}
        underlineColorAndroid='transparent'
        value={content}
      />

      <TouchableOpacity
        onPress={postBlogData}
      >
        {
          blog ?
            <Text style={styles.submitBtn}>Update</Text> :
            <Text style={styles.submitBtn}>Submit</Text>
        }

      </TouchableOpacity>

      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="upload Image" onPress={uploadImage} />
    </View>
  )
}

const styles = StyleSheet.create({

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  header: {
    fontSize: 27,
    marginVertical: 10,
    textAlign: 'left',
    color: 'grey',
    alignSelf: 'flex-start'
  },
  input: {

    width: 300,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    textAlignVertical: 'top'
  },
  contentInput: {
    maxHeight: 250
  },
  submitBtn: {

    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15

  }
})
