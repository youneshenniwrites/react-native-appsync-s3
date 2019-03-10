import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

export default class App extends React.Component {
  state = {
    image: null,
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA)
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
  }

  takePicture = async () => {
    await this.askPermissionsAsync()
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    })
    if (!cancelled) this.setState({ image: uri })
  }

  selectPicture = async () => {
    await this.askPermissionsAsync()
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    })
    if (!cancelled) this.setState({ image: uri })
  }

  render() {
    let {image} = this.state
    return (
      <View style={styles.container}>
        {
          image && 
          <Image style={styles.image} source={{ uri: this.state.image }} />
        }
        <View style={styles.row}>
          <Button onPress={this.selectPicture}>Gallery</Button>
          <Button onPress={this.takePicture}>Camera</Button>
        </View>
      </View>
    )
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
)

let width = Dimensions.get('window').width

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
  row: { flexDirection: 'row' },
  image: { 
    width: width, 
    height: width, 
    backgroundColor: 'gray' 
  },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
