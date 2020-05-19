import React, { Component } from 'react';
import QuestionCM from './QuestionCM';
import QuestionCU from './QuestionCU'
import Text from 'react-native';

class Question extends Component {

    constructor(props){
        super(props)

        this.state={
            item:this.props.item,
            lengthOfItem: this.props.lengthOItem,
            type: this.props.item.type
        }
    }

    componentDidMount(){
        console.log('length---->>> ',this.state.lengthOfItem)
        this.setState({
            item: this.props.item
        })
    }

    render() {
        let question;
        if(this.state.type === 1){
            console.log('yess----->> ', this
            .state.type)
            
            question = <QuestionCM
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            />
        } else if (this.state.type == 2){
            question = <QuestionCU
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            />
        }

        return (
            question
            )
    }
}

export default Question;
