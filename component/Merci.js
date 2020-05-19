import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { Provider as PaperProvider, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { color } from '../utils/GlobalColor';
import {TextInput} from 'react-native-paper';

const { height, width } = Dimensions.get('window');

class QuestionCM extends Component {
	constructor(props) {
		super(props);
        this.state = {
			visible: true
		};
	}

	_showDialog = () => this.setState({ visible: true });

	_hideDialog = () => this.setState({ visible: false });

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<PaperProvider>
					<Portal>
						<Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
							<Dialog.Title
								style={{
									fontSize: 22,
                                    alignContent: 'center'
								}}
							>
								Merci
							</Dialog.Title>
							<Dialog.Content>
								<View>
									<Paragraph
										style={{
											fontSize: 19
										}}
									>
									</Paragraph>
                                    
								</View>
							</Dialog.Content>
							<Dialog.Actions>
                            <Button onPress={this._hideDialog}> Terminer</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</PaperProvider>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: height - height / 4,
		alignItems: 'center',
		justifyContent: 'center',
		width: width,
		backgroundColor: color.appDarkBlue
	},
	radioButtonView: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center'
	},
	cardView: {
		backgroundColor: 'white',
		margin: width * 0.03,
		borderRadius: width * 0.05,
		shadowColor: '#000',
		shadowOffset: { width: 0.5, height: 0.5 },
		shadowOpacity: 0.5,
		shadowRadius: 3
	}
});

export default QuestionCM;
