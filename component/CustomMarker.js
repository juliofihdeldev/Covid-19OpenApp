import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const CustomMarker = () => {
	return (
		<View style={styles.roundMarker}>
			<Image style={styles.roundImage} source={require('../assets/cov19.png')} />
		</View>
	);
};

const styles = StyleSheet.create({
	roundMarker: {
		height: 30,
		width: 30,
		backgroundColor: 'white',
		borderRadius: 15
	},
	roundImage: {
		height: 30,
		width: 30,
		borderRadius: 15
	}
});

export default CustomMarker;
