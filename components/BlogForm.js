import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from './utils';
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Ionicons } from '@expo/vector-icons';

export default function BlogForm({ navigation, route }) {


  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false)
  // const [isUploaded, setIsUploaded] = useState(false)
  // const [uploadingBlog, setUploadingBlog] = useState(false)

  const { blog } = route ? route.params : undefined

  const uploadImage = async () => {

    if (image === '') return
    setUploadingImage(true)
    try {
      const storageRef = ref(storage, `/images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', (snapshot) => {

        // const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100

      }, (error) => {
        console.log(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            console.log(url)
            setThumbnail(url)
            setUploadingImage(false)
          })
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }


  const postBlogData = async () => {

    console.log('post')
    let url = blog ? `${baseUrl}/${blog._id}/edit` : `${baseUrl}/createBlogs`
    let method = blog ? 'put' : 'post';

    try {

      const newBlog = JSON.stringify({
        title,
        thumbnail,
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 350 }}>
        <Text style={styles.header}>Create A Blog</Text>
        <Ionicons
          style={styles.icon}
          name='checkmark-circle-sharp'
          size={54}
          color='purple'
          onPress={postBlogData}
        />
      </View>

      {/* <View style={styles.imageButtonContainer}>
        <Button title="Choose Image" onPress={handleChooseImage} />
        {
          !uploadingImage ?
            <Button title="upload Image" onPress={uploadImage} /> :
            <ActivityIndicator size={'small'} color='black' />
        }
      </View> */}
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
        numberOfLines={10}
        onChangeText={(val) => setContent(val)}
        underlineColorAndroid='transparent'
        value={content}
      />

      <View style={styles.imageButtonContainer}>
        <Button title="Choose Image" color={'purple'} onPress={handleChooseImage} />
        {/* <Image

        /> */}
        {
          !uploadingImage ?
            <Button title="upload Image" color={'purple'} onPress={uploadImage} /> :
            <ActivityIndicator size={'small'} color='black' />
        }
      </View>

      {/* <TouchableOpacity
        onPress={postBlogData}
      >
        {
          blog ?
            <Text style={styles.submitBtn}>UPDATE</Text> :
            <Text style={styles.submitBtn}>SUBMIT</Text>
        }

      </TouchableOpacity> */}



    </View>
  )
}

const styles = StyleSheet.create({

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  header: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start'
  },
  input: {

    width: 350,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,

  },
  contentInput: {
    maxHeight: 250,
    textAlignVertical: 'top'
  },
  submitBtn: {

    backgroundColor: 'purple',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 5,
    width: 350,
    textAlign: 'center'

  },
  icon: {
    marginBottom: 10
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginBottom: 10
  }
})
