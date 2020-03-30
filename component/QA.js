import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Alert, AsyncStorage, Dimensions } from 'react-native';
import { Container, Header, Content, Form, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../utils/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../utils/Loading';
import { urlFunction } from '../utils/url';
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput, Text, Button, ToggleButton } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import WebView from 'react-native-webview';
import QRCode from 'react-native-qrcode-svg';


const { height, width } = Dimensions.get('window');

class QA extends Component {
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
			// email: '',
			prenom: '',
			nom: '',
			type: 'User',
			// password: '',
			// confirm_password: '',
			loading: false,
			showProgress: false,
			sexe: 'M',
			age: '',
			telephone: '',
			qrCode: null,
			baseCode: 'PATCOV#',
			dataArray: [
				{
					value: ''
				}
			]
		};
	}

	updateSex = (sexe) => {
		this.setState({ sexe: sexe });
		console.log('sexe--->>>', sexe);
	};

	ageData = () => {
		let i = '18';
		let dataArray = [];

		for (let index = 12; index < 100; index++) {
			dataArray.push({ value: index });
			this.setState({
				dataArray: dataArray
			});
		}

		console.log('ageArray---->>> ', dataArray);
	};

	getQrCode = (time_) => {
		let qrCodeValue = this.state.baseCode + time_;
		console.log('qrCodeValue', qrCodeValue);

		this.setState(
			{
				qrCode: qrCodeValue
			},
			() => {
				console.log('qr code: ', this.state.qrCode);
			}
		);
	};

	handleSubmit(event) {
		axios
			.post(`${urlFunction()}/headers`, {
				full_name: this.state.nom + ' ' + this.state.prenom,
				sex: this.state.sexe,
				age: this.state.age,
				phone: this.state.telephone
			})
			.then((response) => {
				console.log('responsessss ----->>>> ', response);
				this.setState({
					nom: '',
					prenom: '',
					telephone: '',
					age:'',
					sexe:''
				})
			})
			.catch((error) => {
				console.log('Register fail', error);
			});
	}

	componentDidMount() {
		console.log(`url---> ${urlFunction()}/headers `);
	}

	render() {
		return (
			<Container>
				<LinearGradient style={styles.container} colors={[ '#D31027', '#EA384D', '#D31027' ]}>
					{this.state.showProgress == true ? <Loading /> : null}
					<Content>
						<Form
							style={{
								alignItems: 'center',
								width: width,
								marginBottom: Platform.OS == 'ios' ? 0 : 300
							}}
						>
							<View>
								<TextInput
									label="Votre nom"
									value={this.state.nom}
									mode="outlined"
									onChangeText={(nom) => this.setState({ nom })}
									style={styles.inputStyle}
								/>

								<TextInput
									label="Votre prenom"
									value={this.state.prenom}
									mode="outlined"
									onChangeText={(prenom) => this.setState({ prenom })}
									style={styles.inputStyle}
								/>

								<TextInput
									label="Votre numéro de telephone"
									value={this.state.telephone}
									mode="outlined"
									onChangeText={(telephone) => this.setState({ telephone })}
									style={styles.inputStyle}
								/>

								<TextInput
									label="Votre age"
									value={this.state.age}
									mode="outlined"
									onChangeText={(age) => this.setState({ age })}
									style={styles.inputStyle}
								/>
							</View>

							<PaperProvider>
								<View style={styles.buttonSexe}>
									<Text style={styles.textSexe}>Sexe: {this.state.sexe}</Text>
								</View>
								<ToggleButton.Group onValueChange={this.updateSex} value={this.state.sexe}>
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<ToggleButton icon="human-male" value="M" style={{ width: width / 4 }} />
										<ToggleButton icon="human-female" value="F" style={{ width: width / 4 }} />
									</View>
								</ToggleButton.Group>
							</PaperProvider>

							<TouchableOpacity onPress={this.register}>
								<View style={styles.buttonRegister}>
									<Text style={styles.textRegister}>Enregistrer</Text>
								</View>
							</TouchableOpacity>

							<View style={styles.buttonSexe}>
								<Text style={styles.textSexe}>{this.state.qrCode}</Text>
								<View style={styles.qrCodeView}>
									<QRCode size = {200}
										value={this.state.qrCode === null ? this.state.baseCode : this.state.qrCode}
									/>
								</View>
							</View>
						</Form>
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

	register = () => {
		if (this.state.nom === '') {
			alert("Name can't be null");
			return;
		} else if (this.state.prenom === '') {
			alert("prenom can't be null");
			return;
		} else if (this.state.telephone === '') {
			alert("Telephon can't be null");
			return;
		} else if (this.state.sexe === '') {
			alert("Sexe can't be null");
			return;
		} else if (this.state.age === '') {
			alert("Age can't be null");
			return;
		} else {
			this.getQrCode(new Date().getTime());
			alert(
				'Information : ' +
					'Nom: ' +
					this.state.nom +
					' Prenom: ' +
					this.state.prenom +
					' Telepbone: ' +
					this.state.telephone +
					' Age: ' +
					this.state.age +
					' Sexe: ' +
					this.state.sexe +
					' QR Code : ' +
					this.state.baseCode
			);

			this.handleSubmit();
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: width
		// backgroundColor: color.appDarkBlue
	},
	viewStyle: {
		backgroundColor: 'red',
		flex: 1,
		flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'space-between',
		// position: 'absolute',
		// bottom: 0,
		width: width / 4
	},
	inputStyle: {
		height: 38,
		width: width - width / 6,
		// borderColor: '#fff',
		// borderWidth: 1,
		// paddingLeft: 10,
		marginTop: 10,
		// marginLeft: 4,
		bottom: 5,
		borderRadius: 8,
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 16,
		marginBottom: 16,
		backgroundColor: color.appDarkBlue
	},

	buttonRegister: {
		paddingVertical: 9, // Vertical padding
		textAlign: 'center',
		width: 200,
		marginTop: 30,
		color: '#fff',
		backgroundColor: color.appRed,
		borderRadius: 20
	},
	buttonSexe: {
		paddingVertical: 9, // Vertical padding
		textAlign: 'center',
		width: width / 2,
		marginTop: 10,
		color: '#fff',
		backgroundColor: color.appRed,
		marginBottom: 10
	},
	textRegister: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	textSexe: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
	pickerStyle: {
		height: 100,
		width: '70%',
		justifyContent: 'center',
		padding: 40,
		marginTop: height * 0.04
	},
	dropDown: {
		height: 90,
		width: '100%',
		color: 'white',
		justifyContent: 'flex-end',
		paddingTop: 20,
		marginTop: 50
	},
	qrCodeView: {
		marginTop: 10,
		alignItems: 'center'
	}
});

export default QA;
