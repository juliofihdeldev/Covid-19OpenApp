import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Dimensions} from 'react-native';
import Question from './Question';
import axios from 'axios';
import { urlFunction } from '../utils/url';
import QuestionCU from './QuestionCU';
import QuestionCM from './QuestionCM';

class Quiz extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: [],
			sliceValue: 1,
		};
	}

	getQuestion = () => {
		axios
			.get(`${urlFunction()}/questions/`)
			.then((response) => {

				let objectWithResponce = [];
				let  resQuestion = []
				response.data.forEach(el => {
					resQuestion = el.choice.split(',');
					el['options'] = resQuestion
					objectWithResponce.push(el)
				})

				this.setState({
					questions: objectWithResponce,
					check: objectWithResponce.options
				});
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

	componentWillMount() {
		this.getQuestion();
	}

	// renderQuestion(){
		
	// 	let question;

	// 	<FlatList
	// 		data={this.state.questions.slice(this.state.sliceValue - 1, this.state.sliceValue)}
	// 		keyExtractor={(item, index) => 'key' + index}
	// 		renderItem={({ item }) =>
	// 			(
	// 			<QuestionCM
	// 			item={item}
	// 			itemChoice={item.choice}
	// 			callNextQuestion={this.callNextQuestion}
	// 			lengthOItem={this.state.questions.length || 0}
	// 			questionNumber={this.state.sliceValue }
	// 			/>
	// 			)}
	// 			keyExtractor={item => parseInt(item.id)}
	// 		/>
	// }

	render() {
		return (
			<FlatList
			data={this.state.questions.slice(this.state.sliceValue - 1, this.state.sliceValue)}
			keyExtractor={(item, index) => 'key' + index}
			renderItem={({ item }) =>
				(
				<Question
				item={item}
				itemChoice={item.choice}
				callNextQuestion={this.callNextQuestion}
				lengthOItem={this.state.questions.length || 0}
				questionNumber={this.state.sliceValue }
				/>)}
				keyExtractor={item => parseInt(item.id)}
			/>
		
		)
	}
}


export default Quiz;

