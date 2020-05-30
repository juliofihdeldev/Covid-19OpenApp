import React, { Component } from 'react';
import QuestionCM from './QuestionCM';
import QuestionCU from './QuestionCU'
import QuestionInput from './QuestionInput';
import Merci from './Merci'

class Question extends Component {

    constructor(props){
        super(props)

        this.state={
            item:this.props.item,
            lengthOfItem: this.props.lengthOItem,
            type: this.props.item.type,
            answer: {}
        }
    }

    componentDidMount(){
        console.log(`Question Page-----------------------`)
        console.log('length---->>> ',this.state.lengthOfItem)
        this.setState({
            item: this.props.item
        })
    }

    render() {
        let question;
        if(this.props.questionNumber < this.state.lengthOfItem){
        switch (this.state.type) {
            case 1:
                question = <QuestionCM
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            answer_={this.state.answer}
            />
                break;
            case 2:
                question = <QuestionCU
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            answer_={this.state.answer}
            />
                break;
            case 3:
                question = <QuestionInput
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            answer_={this.state.answer}
            />
                break;
        }
    }else{
            question = <Merci/>
    }

        return (
            question
            )
    }
}

export default Question;
