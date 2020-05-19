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
            text:'',
			visible: true,
			responseValue: [],
			value: '',
			qNumber: this.props.questionNumber,
			check: this.props.item.options
		};
	}

	clearAll = () => {
		this.setState({
			responseValue: [],
			value: '',
			check: [],
			qNumber: this.state.qNumber + 1
		})
	}

	componentWillReceiveProps() {
		this.loadFunc();
	}

	loadFunc = () => {
		this.setState({
			check: this.props.item.options
		});
	};

	_showDialog = () => this.setState({ visible: true });

	_hideDialog = () => this.setState({ visible: false });

	getNextQuestion = (value) => {
		this.props.callNextQuestion(value);  
		this.clearAll()
	};

	render() {
		const { value } = this.state;
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
								Question {this.state.qNumber}
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
                                    <RadioButton.Group
                                                    onValueChange={value => this.setState({ value })}
                                                    value={this.state.value}
                                                >
										 {/* Option 1 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														value: 'Oui' 
													}),
                                                    console.log('yyeeeee------->> ', this.state.value)
												}}
											>
												<Text>Oui</Text>
												<RadioButton
													value='Oui'
													status={this.state.value === 'Oui' ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 2 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														value: 'Non' 
													}),
                                                    console.log('yyeeeee------->> ', this.state.value)
												 }}
											>
												<Text>Non</Text>
												<RadioButton
													value='Non'
													status={this.state.value === 'Non' ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>
                                            {/* Text Input */}
                                            <TextInput
                                                label="Veuillez precisez svp"
                                                value={this.state.text}
                                                mode="outlined"
                                                onChangeText={(text) => this.setState({ text })}
                                                style={styles.inputStyle}
                                                disabled = {this.state.value === 'Oui' ? false : true}
                                            />

                                        </RadioButton.Group>

								</View>
							</Dialog.Content>
							<Dialog.Actions>
								{this.props.lengthOItem != this.props.item.id ? (
									<Button
										onPress={() => {
											// 
											if(this.state.value === '' && this.state.text === ''){
												alert('you must choose an option')
											} else {
											console.log('result-----',this.state.value, this.state.text)
											console.log('qNumber---', this.state.qNumber)
											this.getNextQuestion(this.state.qNumber + 1);
											}
										}}
									>
										question {this.props.questionNumber} sur {this.props.lengthOItem} Continuer
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
