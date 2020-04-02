import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput, Image, Text, Alert, AsyncStorage, Dimensions } from 'react-native';
import { Container, Header, Content, Form, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../utils/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../utils/Loading';
import { urlFunction } from '../utils/url';
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import CustomMarker from './CustomMarker';
import { locations } from './Locations';

const { height, width } = Dimensions.get('window');
class Map extends Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#03274B'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			prenom: '',
			nom: '',
			type: 'User',
			password: '',
			confirm_password: '',
			loading: false,
			showProgress: false
		};
	}

	render() {
		return (
			<Container>
				<LinearGradient style={styles.container} colors={[ '#D31027', '#EA384D', '#D31027' ]}>
					{this.state.showProgress == true ? <Loading /> : null}
					<Content>
						<View>
							<Text
								style={{
									fontSize: 20,
									color: '#fff',
									textAlign: 'center'
								}}
							>
								List moun ki infekte pa depatman
							</Text>
						</View>

						<View>
							<MapView
								provider={PROVIDER_GOOGLE}
								style={styles.mapStyle}
								initialRegion={{
									latitude: 18.5564,
									longitude: -72.3068,
									latitudeDelta: 3.0922,
									longitudeDelta: 0.000021
								}}
							>
								{locations.map((marker, index) => (
									<Marker
										key={index}
										coordinate={{
											latitude: marker.latitude,
											longitude: marker.longitude
										}}
										title={marker.title}
										description={marker.description}
									>
										<CustomMarker />
									</Marker>
								))}
							</MapView>
						</View>
					</Content>
				</LinearGradient>
			</Container>
		);
	}

	message_alert = (title, message, path) => {
		Alert.alert(title, message, [ { text: 'OK', onPress: () => console.log('Your action code here') } ], {
			cancelable: false
		});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: width,
		backgroundColor: color.appDarkBlue
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	}
});

export default Map;
