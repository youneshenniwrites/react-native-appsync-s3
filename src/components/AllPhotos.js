import React from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import { graphql } from 'react-apollo';
import QueryListPictures from '../graphQL/QueryListPictures';
import Storage from '@aws-amplify/storage';

class AllPhotos extends React.Component {
	state = {
		allImagesURIs: []
	}

	componentDidMount = async () => {
		await this.getAllPics()
	}

	getAllPics = () => {
		/* 
		The graphql query returns photos.
		We then perform a get call with Storage API to retrieve the URI of each photo.
		We then store all uris in the state to be called in the render method.
		*/
		let {photos} = this.props
		let access = {level: 'public'}
		if (photos && photos.items) {
			photos.items.map((photo, index) => {
				let key = photo.file.key.substring(7) // get rid of folder name in key
				Storage.get(key, access)
				.then((response) => {
					uri = response.substr(0, 98) // extract uri from response
					if (this.state.allImagesURIs.includes(uri)) {
						return
					} else {
						this.setState(prevState => ({
							allImagesURIs: [...prevState.allImagesURIs, uri]
						}))
					}
				})
				.catch(err => console.log(err))
			})
		}
	}

	render() {
		let {allImagesURIs} = this.state
		return (
			<View style={{flex: 1, alignItems: 'center'}}>
				<TouchableOpacity onPress={this.componentDidMount}>
					<Icon active name="refresh" />
				</TouchableOpacity>
				<ScrollView contentContainerStyle={styles.container}>
					{	
						allImagesURIs.map((uri, index) => {
							return (
								<Image key={index} style={styles.image} source={{ uri: uri }}/>
							)
						})
					}
				</ScrollView>
			</View>
		);
	}
}

export default graphql(
	QueryListPictures,
	{
		options: {
			fetchPolicy: 'cache-and-network',
		},
		props: ({ data: { listPictures: photos } }) => ({
			photos,
		})
	}
)(AllPhotos);

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: width,
		height: width,
		marginBottom: 24
	},
});