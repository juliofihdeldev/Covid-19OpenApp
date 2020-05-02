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
			checked_1: '',
			checked_2: '',
			checked_3: '',
			checked_4: '',
			checked_5: '',
			qNumber: this.props.questionNumber,
			check: this.props.item.options
		};
	}

	clearAll = () => {
		this.setState({
			responseValue: [],
			checked_1: '',
			checked_2: '',
			checked_3: '',
			checked_4: '',
			checked_5: '',
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
		const { checked_1, checked_2, checked_3, checked_4, checked_5 } = this.state;
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
										 {/* Option 1 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														checked_1: this.state.checked_1 === this.state.check[0] ? '' : this.state.check[0],
														checked_5: ''
													});
												}}
											>
												<Text>{this.state.check[0]}</Text>
												<RadioButton
													value={this.state.check[0]}
													status={checked_1 === this.state.check[0] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 2 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														checked_2: this.state.checked_2 == this.state.check[1] ? '' : this.state.check[1],
														checked_5: ''
													});
												 }}
											>
												<Text>{this.state.check[1]}</Text>
												<RadioButton
													value={this.state.check[1]}
													status={checked_2 === this.state.check[1] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 3 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														checked_3: this.state.checked_3 == this.state.check[2] ? '' : this.state.check[2],
														checked_5:''
													});
												 }}
											>
												<Text>{this.state.check[2]}</Text>
												<RadioButton
													value={this.state.check[2]}
													status={checked_3 === this.state.check[2] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 4 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														checked_4: this.state.checked_4 == this.state.check[3] ? '' : this.state.check[3],
														checked_5:''
													});
												 }}
											>
												<Text>{this.state.check[3]}</Text>
												<RadioButton
													value={this.state.check[3]}
													status={checked_4 === this.state.check[3] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

											{/* Option 5 */}
											<TouchableOpacity
												style={styles.radioButtonView}
												onPress={() => {
													this.setState({
														checked_5: this.state.checked_5 == this.state.check[4] ? '' : this.state.check[4]
													}, ()=> {

														if(this.state.checked_5 === this.state.check[4]){
														console.log('yes')
														this.setState({
															checked_1:'',
															checked_2:'',
															checked_3:'',
															checked_4:''
														})
													}
													})
												}}
											>
												<Text>{this.state.check[4]}</Text>
												<RadioButton
													value={this.state.check[4]}
													status={checked_5 === this.state.check[4] ? 'checked' : 'unchecked'}
													/>
											</TouchableOpacity>

								</View>
							</Dialog.Content>
							<Dialog.Actions>
								{this.props.lengthOItem != this.props.item.id ? (
									<Button
										onPress={() => {
											// 
											if(this.state.checked_1 == '' && this.state.checked_2 == '' && this.state.checked_3 == '' && this.state.checked_4 == '' && this.state.checked_5 == ''){
												alert('you must choose an option')
											} else {
											console.log('result-----',this.state.checked_1,this.state.checked_2,this.state.checked_3,this.state.checked_4)
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
