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
			.get(`${urlFunction()}/questions/`)
			.then((response) => {
				this.setState({
					questions: response.data
				});
				console.log('data-----', this.state.questions.length)
			})
			.catch((error) => {
				alert(error)
				console.log('loading question error---->> ', error);
			});
	};

	callNextQuestion = (value) => {
		console.log('value----- ', value)
		if(value <= this.state.questions.length){
		this.setState(
			{
				sliceValue: value
			},
			() => console.log('')
		);
	}
	};
	componentWillMount(){
		this.callNextQuestion(this.state.sliceValue)
	}

	componentWillMount() {
		this.getQuestion();
	}

	render() {
		// let { sliceValue } = this.state;
		return (
			<SafeAreaView>
				<View
					style={{
						height: 1000
					}}
				>
					<FlatList
						data={this.state.questions.slice(this.state.sliceValue - 1, this.state.sliceValue)}
						keyExtractor={(item, index) => 'key' + index}
						renderItem={({ item }) => (
							<View>
								<QuestionCM
									item={item}
									itemChoice={item.choice}
									callNextQuestion={this.callNextQuestion}
									lengthOItem={this.state.questions.length || 0}
									questionNumber={this.state.sliceValue }
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
