import React, { Component } from 'react';
import QuestionCM from './QuestionCM';
import axios from 'axios';
import { urlFunction } from '../utils/url';
import {Text} from 'react-native-paper';

class Quiz extends Component {

    constructor(props){
        super(props)

        this.state = {
            questions: ''
        }
    }

    getQuestion=()=>{
        axios.get(`${urlFunction()}/questions`)
        .then(
            (response)=>{
                this.setState({
                    questions: response.data
                },()=> console.log("questions----->> ",this.state.questions))
                console.log("reponsee------>>> ",response.data.length)
            }
         )
         .catch((error)=>{
             console.log("loading question error---->> ",error)
         })
    }

    componentWillMount(){
        this.getQuestion();
    }

  render() {
    return (
      <Text>....................</Text>
    );
  }
}

export default Quiz;
