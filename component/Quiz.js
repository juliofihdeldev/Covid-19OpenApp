import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import QuestionCM from './QuestionCM';
import axios from 'axios';
import { urlFunction } from '../utils/url';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';

class Quiz extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: [],
			sliceValue: 1
		};
	}

	getQuestion = () => {
		axios
			.get(`${urlFunction()}/questions`)
			.then((response) => {
				this.setState({
					questions: response.data
				});
			})
			.catch((error) => {
				console.log('loading question error---->> ', error);
			});
	};

	callNextQuestion = (value) => {
		this.setState(
			{
				sliceValue: value
			},
			() => console.log('')
		);
	};

	componentWillMount() {
		this.getQuestion();
	}

	render() {
		let { sliceValue } = this.state;
		return (
			<SafeAreaView>
				<View
					style={{
						height: 1000
					}}
				>
					<FlatList
						data={this.state.questions.slice(sliceValue - 1, sliceValue)}
						keyExtractor={(item, index) => 'key' + index}
						renderItem={({ item }) => (
							<View>
								<QuestionCM
									item={item}
									itemChoice={item.choice}
									callNextQuestion={this.callNextQuestion}
									lengthOItem={this.state.questions.length || 0}
								/>
							</View>
						)}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

export default Quiz;
