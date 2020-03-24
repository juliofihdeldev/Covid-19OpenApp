import React from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';

const styles = StyleSheet.create({
	imageOverlay : {
		position : 'absolute',
		left     : 0,
		right    : 0,
		bottom   : 0,
		top      : 0,
	},
	container    : {
		flex            : 1,
		alignContent    : 'center',
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : 'rgba(255, 255, 255, 0.3)',
		position        : 'absolute',
		left            : 0,
		right           : 0,
		bottom          : 0,
		top             : 0,
	},
});

export default class InitialPage extends React.Component {
	constructor (props) {
		super(props);
	}
	_move = async () => {
		try {
			this.props.navigation.navigate('Tabs');	
		} catch (error) {
			console.log(error);
		}
	};
	render () {
		return (
			<View style={styles.container}>
				<NavigationEvents onDidFocus={(payload) => this._move()} />
				<ActivityIndicator color='#F58634' size='small' />
			</View>
		);
	}
}
