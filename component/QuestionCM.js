import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { Provider as PaperProvider, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import { color } from '../utils/GlobalColor';

const { height, width } = Dimensions.get('window');

class QuestionCM extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: true,
			responseValue: [],
			checkIndex: [],
			check: this.props.itemChoice.split(';')
		};
	}

	componentWillReceiveProps = () => {
		console.log('itemChoice', this.props.itemChoice);
		this.setState({
			check: this.props.item.choice.split(';')
		});
	};

	getCheckIndex = () => {
		let myArray = [];
		for (let index = 0; index < this.state.check.length; index++) {
			const element = 'check_' + index;
			myArray.push(element);
		}
		this.setState(
			{
				checkIndex: myArray
			},
			() => console.log('myarray---->> ', this.state.checkIndex)
		);
	};

	_showDialog = () => this.setState({ visible: true });

	_hideDialog = () => this.setState({ visible: false });

	getNextQuestion = (value) => {
		this.props.callNextQuestion(value);
		if (this.props.itemChoice != this.state.check) {
			this.setState({
				check: this.props.itemChoice
			});
		}
	};

	render() {
		const { checked_1, checked_2, checked_3, checked_4, checked_5, checked_6, checked_7, checked_8 } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<PaperProvider>
					<Portal>
						<Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
							<Dialog.Title
								style={{
									fontSize: 22
								}}
							>
								Question {this.props.item.id}
							</Dialog.Title>
							<Dialog.Content>
								<View>
									<Paragraph
										style={{
											fontSize: 19
										}}
									>
										{this.props.item.title}
									</Paragraph>

									{this.state.check.map((value, index) => {
										return (
											<TouchableOpacity
												key={index}
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														checked_1: this.state.checked_1 == 'Fièvre' ? '' : 'Fièvre'
													});
												}}
											>
												<Text>{value}</Text>
												<RadioButton
													value={this.state.checked_1}
													status={checked_1 === 'Fièvre' ? 'checked' : 'unchecked'}
												/>
											</TouchableOpacity>
										);
									})}
								</View>
							</Dialog.Content>
							<Dialog.Actions>
								{this.props.lengthOItem != this.props.item.id ? (
									<Button
										onPress={() => {
											this.getNextQuestion(this.props.item.id + 1);
										}}
									>
										question {this.props.item.id} sur {this.props.lengthOItem} Continuer
									</Button>
								) : (
									<Button onPress={this._hideDialog}> Terminer</Button>
								)}
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
