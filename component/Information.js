import React, { Component } from 'react';
import { View, Platform, StyleSheet, TextInput, Image, Text, Alert, AsyncStorage, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../utils/GlobalColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../utils/Loading';
import { urlFunction } from '../utils/url';
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';

const { height, width } = Dimensions.get('window');

class Information extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#03274B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    render() {
        return (
            <Container>
                <LinearGradient
                    style={styles.container}
                    colors={[
                        '#D31027',
                        '#EA384D',
                        '#D31027',
                    ]}>
                    {
                        this.state.showProgress == true ? <Loading /> :
                            null}
                
                    <Content>
                    <View>
                            <Text style={{
                                fontSize: 30,
                                color: "#fff"
                        }}>
                            Information list
                        </Text>
                    </View>
                        <Card
                        >
                        <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'https://www.communication.gouv.ht/wp-content/uploads/2020/02/A4821BBB-CB56-4EB1-B2E5-4F4A5E923E34-847x477.jpeg'}} />
                            <Body>
                            <Text>MSPP</Text>
                            <Text note>March 15, 2020</Text>
                            </Body>
                        </Left>
                        </CardItem>
                        <CardItem>
                                <Body
                                style={{
                                    fontSize: 30,
                                    color: "#fff"
                            }}>
                            <Text>
                            Coronavirus: une entreprise japonaise annonce avoir développé un vaccin
                            </Text>
                        </Body>
                        </CardItem>
                        <CardItem>
                        </CardItem>
                    </Card>
                </Content>

                </LinearGradient>
            </Container>
        );
    }

    message_alert = (title, message, path) => {
        Alert.alert(
            title,
            message,
            [
                { text: 'OK', onPress: () => console.log('Your action code here') },
            ],
            { cancelable: false },
        );
    };
}

const styles = StyleSheet.create({
	container          : {
		flex            : 1,

		justifyContent  : 'center',
		width           : width,
		backgroundColor : color.appDarkBlue,
	},
	inputStyle         : {
		height       : 38,
		width        : 300,
		borderColor  : '#fff',
		borderWidth  : 1,
		paddingLeft  : 10,
		marginTop    : 10,
		marginLeft   : 4,
		bottom       : 5,
		borderRadius : 8,
		fontWeight   : 'bold',
		color        : '#fff',
	},
	
	buttonRegister     : {
		paddingVertical : 9, // Vertical padding
		textAlign       : 'center',
		width           : 200,
		marginTop       : 16,
		color           : '#fff',
		backgroundColor : color.appRed,
		borderRadius    : 20,
	},
	textRegister       : {
		color      : '#fff',
		fontWeight : 'bold',
		textAlign  : 'center',
	},
});

export default Information;
