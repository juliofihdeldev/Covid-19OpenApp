import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
	imageOverlay : {
		position : 'absolute',
		left     : 0,
		right    : 0,
		bottom   : 0,
		top      : 0,
		zIndex   : 100,
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

export default class Loading extends React.Component {
	render () {
		return (
			<View style={styles.container}>
				<ActivityIndicator color='#fff' size='large' />
			</View>
		);
	}
}
