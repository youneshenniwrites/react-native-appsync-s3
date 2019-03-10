import React from 'react';
import { graphql } from 'react-apollo';
import {
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';
import { v4 as uuid } from 'uuid';
import { Icon } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import MutationCreatePicture from '../graphQL/MutationCreatePicture';
import QueryListPictures from '../graphQL/QueryListPictures';
import Auth from '@aws-amplify/auth';
import { RNS3 } from 'react-native-aws3';
import keys from '../keys'

class AddPhoto extends React.Component {
	state = {
		image: null,
		lastUpdate: new Date().toISOString(),
	}

	sendPicS3 = async (uri) => {
		const { bucket, region } = this.props.options;
		let pic = {
			uri: uri,
			name: uuid(),
			type: "image/jpeg",
			bucket,
			region,
		}
		const config = {
			keyPrefix: "public/",
			bucket,
			region,
			accessKey: keys.accessKey,
			secretKey: keys.secretKey,
			successActionStatus: 201
		}
		const { username: owner } = await Auth.currentUserInfo();
		const visibility = 'public';
		let file;
		RNS3.put(pic, config)
		.then(response => {
			if (response.status !== 201) {
				throw new Error("Failed to upload image to S3");
			} else {
				const { type: mimeType } = response;
				const key = `${visibility}/${pic.name}`;
				file = {
					bucket,
					region,
					key,
					mimeType,
				};
				this.props.createPicture({ owner, visibility, file });
			}
		})
	}

	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA_ROLL)
	}

	useLibraryHandler = async () => {
		await this.askPermissionsAsync()
		const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync(
			{
				allowsEditing: false,
			}
		)
		if (!cancelled) {
			this.setState({ image: uri })
			this.sendPicS3(this.state.image)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>File upload using AppSync, S3 and DynamoDB</Text>
				<Icon
					active
					name="add-circle"
					onPress={this.useLibraryHandler}
				/>
			</View>
		);
	}
}

export default graphql(
	MutationCreatePicture,
	{
		options: {
			update: (proxy, { data: { createPicture } }) => {
				const query = QueryListPictures;
				const data = proxy.readQuery({ query });
				data.listPictures.items = [
						...data.listPictures.items.filter((photo) => photo.id !== createPicture.id),
						createPicture
				];
				proxy.writeQuery({ query, data });
			}
		},
		props: ({ ownProps, mutate }) => ({
			createPicture: photo => mutate({
				variables: { input: photo },
				optimisticResponse: () => ({
					createPicture: {
						...photo,
						id: uuid(),
						createdAt: new Date().toISOString(),
						__typename: 'Picture',
						file: { ...photo.file, __typename: 'S3Object' }
					}
				}),
			}),
		}),
	}
)(AddPhoto);

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: width,
		height: width,
	},
});