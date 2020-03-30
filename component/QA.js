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
import { TextInput, Text, Button, ToggleButton,ActivityIndicator, Colors,Paragraph, Dialog, Portal } from 'react-native-paper';
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
			prenom: '',
			nom: '',
			type: 'User',
			loading: false,
			showProgress: false,
			sexe: 'M',
			age: '',
			telephone: '',
			qrCode: null,
			visible: false,
			baseCode: 'PATCOV#',
			loading: false
		};
	}

	updateSex = (sexe) => {
		this.setState({ sexe: sexe });
	};

	getQrCode = (time_) => {
		let qrCodeValue = this.state.baseCode + time_;

		this.setState(
			{
				qrCode: qrCodeValue
			},
			() => {
				console.log('qr code: ', this.state.qrCode);
			}
		);
	};

	createAlert = (msgTitle, msgContent) => {
		Alert.alert(
      msgTitle,
      msgContent,
      [
        { text: "OK", onPress: () => this.setState({visible: true}) }
      ],
      { cancelable: false }
    );
	}

	handleSubmit() {
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
					sexe:'',
					loading: false
				})
			})
			.catch((error) => {
				console.log('Register fail', error);
			});
	}

	componentDidMount() {
		console.log(`url---> ${urlFunction()}/headers `);
	}

	 _showDialog = () => this.setState({ visible: true });

  	 _hideDialog = () => this.setState({ visible: false });

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

							<ActivityIndicator animating={this.state.loading} color={Colors.black} />

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
							<PaperProvider>
								<Portal>
									<Dialog
										visible={this.state.visible}
										onDismiss={this._hideDialog}>
										<Dialog.Title>Alert</Dialog.Title>
										<Dialog.Content>
										<Paragraph>Do you want to made the self Test?</Paragraph>
										</Dialog.Content>
										<Dialog.Actions>
										<Button onPress={this._hideDialog}>No</Button>
										<Button onPress={()=>
										this.props.navigation.navigate("Quiz")}>Yes</Button>
										</Dialog.Actions>
									</Dialog>
        						</Portal>
								</PaperProvider>
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
			this.setState({
				loading: true
			})
			this.getQrCode(new Date().getTime());
			this.createAlert("Success", "Data registered with success")

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
	qrCodeView: {
		marginTop: 10,
		alignItems: 'center'
	}
});

export default QA;
