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
														value: this.state.value === this.state.check[0] ? '' : this.state.check[0]
													});
												}}
											>
												<Text>{this.state.check[0]}</Text>
												<RadioButton
													value={this.state.check[0]}
													status={value === this.state.check[0] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 2 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														value: this.state.value == this.state.check[1] ? '' : this.state.check[1]
													});
												 }}
											>
												<Text>{this.state.check[1]}</Text>
												<RadioButton
													value={this.state.check[1]}
													status={value === this.state.check[1] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 3 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														value: this.state.value == this.state.check[2] ? '' : this.state.check[2]
													});
												 }}
											>
												<Text>{this.state.check[2]}</Text>
												<RadioButton
													value={this.state.check[2]}
													status={value === this.state.check[2] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 4 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														value: this.state.value == this.state.check[3] ? '' : this.state.check[3]
													});
												 }}
											>
												<Text>{this.state.check[3]}</Text>
												<RadioButton
													value={this.state.check[3]}
													status={value === this.state.check[3] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 5 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														value: this.state.value == this.state.check[4] ? '' : this.state.check[4]
													}, ()=> {

													// 	if(this.state.value === this.state.check[4]? 'checked' : 'unchecked'){
													// 	console.log('yes')
													// 	this.setState({
													// 		value:'',
													// 		checked_2:'',
													// 		checked_3:'',
													// 		checked_4:''
													// 	})
													// }
													})
												}}
											>
												<Text>{this.state.check[4]}</Text>
												<RadioButton
													value={this.state.check[4]}
													status={value === this.state.check[4] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>
                                        </RadioButton.Group>
								</View>
							</Dialog.Content>
							<Dialog.Actions>
								{this.props.lengthOItem != this.props.item.id ? (
									<Button
										onPress={() => {
											// 
											if(this.state.value == ''){
												alert('you must choose an option')
											} else {
											console.log('result-----',this.state.value)
											console.log('qNumber---', this.state.qNumber)
											if(this.state.qNumber <= this.props.lengthOItem){
											this.getNextQuestion(this.state.qNumber + 1);
											}
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
