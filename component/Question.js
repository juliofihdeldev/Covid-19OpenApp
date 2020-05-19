import React, { Component } from 'react';
import QuestionCM from './QuestionCM';
import QuestionCU from './QuestionCU'
import QuestionInput from './QuestionInput';

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
        switch (this.state.type) {
            case 1:
                question = <QuestionCM
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            />
                break;
            case 2:
                question = <QuestionCU
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            />
                break;
            case 3:
                question = <QuestionInput
            item={this.state.item}
            itemChoice={this.state.item.choice}
            callNextQuestion={this.props.callNextQuestion}
            lengthOItem={this.state.lengthOfItem || 0}
            questionNumber={this.props.questionNumber}
            />
                break;
        }
       

        return (
            question
            )
    }
}

export default Question;
