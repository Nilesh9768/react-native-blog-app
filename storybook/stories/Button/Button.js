import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ onPress = () => { }, children = "", outline = false, backgroundColor,color }) {

  let customBackgroundColor = {
    backgroundColor
  }
  let customTextColor = {
    color
  }
  let containerStyle = [styles.container,customBackgroundColor]
  let textStyle = [styles.text,customTextColor]
  if (outline) {
    let textColor = {
      color
    }
    let borderColor = {
      borderColor:color
    }
    containerStyle.push(styles.outlineContainer,borderColor)
    textStyle.push(styles.outlineText,textColor)
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#0099ff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4
  },
  outlineContainer: {
    backgroundColor: 'white',
    borderColor: '#0099ff',
    borderWidth: 1
  },
  text: {
    color: 'white',
    fontSize: 18
  },
  outlineText: {
    color: '#0099ff'
  }
})

