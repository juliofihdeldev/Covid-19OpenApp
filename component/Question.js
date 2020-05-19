import React, { Component } from 'react';
import QuestionCM from './QuestionCM';

class Question extends Component {

    constructor(props){
        super(props)

        this.state={
            item:this.props.item,
            lengthOfItem: this.props.questions.length,
            QuestionNumber: this.props.sliceValue,
            type: this.props.item.type
        }
    }

    componentDidMount(){
        console.log('length---->>> ',this.state.lengthOfItem)
    }

    render() {
        let question;
        if(this.state.type === 1){
            question = <QuestionCM
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.state.QuestionNumber}
            />
        }

        return (
            question
        );
    }
}

export default Question;
