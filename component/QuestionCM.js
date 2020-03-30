import React, { Component } from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';
import {Text,Button,Dialog,Portal,RadioButton} from 'react-native-paper';
import { Provider as PaperProvider, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

class QuestionCM extends Component {
    constructor(props){
        super(props)

        this.state = {
            visible: true,
            responseValue: [],
            checked_1: '',
            checked_2: '',
            checked_3: '',
            checked_4: '',
            checked_5: '',
            checked_6: '',
            checked_7: '',
            checked_8: ''
        }
    }

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

  render() {
      const { checked_1, checked_2,checked_3,checked_4,checked_5,checked_6,checked_7,checked_8 } = this.state;
    return (
      <PaperProvider>
        <Button onPress={this._showDialog}>Show Dialog</Button>
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Question 1</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Quels sont vos symptômes?</Paragraph>
              {/*
                 ;Autres;" */}
                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_1: this.state.checked_1 =='Fièvre'? '':'Fièvre'  }); 
                    }}>
                <Text>Fièvre</Text>
                    <RadioButton value={this.state.checked_1}
                    status={checked_1 === 'Fièvre' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_2: this.state.checked_2 =='Fatigue inhabituelle'? '':'Fatigue inhabituelle'  }); 
                    }}>
                <Text>Fatigue inhabituelle</Text>
                    <RadioButton value={this.state.checked_2}
                    status={checked_2 === 'Fatigue inhabituelle' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_3: this.state.checked_3 =='Courbatures'? '':'Courbatures'  }); 
                    }}>
                <Text>Courbatures</Text>
                    <RadioButton value={this.state.checked_3}
                    status={checked_3 === 'Courbatures' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_4: this.state.checked_4 =='Toux et maux de gorge'? '':'Toux et maux de gorge'  }); 
                    }}>
                <Text>Toux et maux de gorge</Text>
                    <RadioButton value={this.state.checked_4}
                    status={checked_4 === 'Toux et maux de gorge' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_5: this.state.checked_5 =='Gêne respiratoire'? '':'Gêne respiratoire'  }); 
                    }}>
                <Text>Gêne respiratoire</Text>
                    <RadioButton value={this.state.checked_5}
                    status={checked_5 === 'Gêne respiratoire' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_6: this.state.checked_6 =='Perte de l\'appetit'? '':'Perte de l\'appetit'  }); 
                    }}>
                <Text>Perte de l'appetit</Text>
                    <RadioButton value={this.state.checked_6}
                    status={checked_6 === 'Perte de l\'appetit' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>
      
                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_7: this.state.checked_7 =='Baisse de l\'audition ( manke tande bien?)'? '':'Baisse de l\'audition ( manke tande bien?)'  }); 
                    }}>
                <Text>Baisse de l'audition ( manke tande bien?)</Text>
                    <RadioButton value={this.state.checked_7}
                    status={checked_7 === 'Baisse de l\'audition ( manke tande bien?)' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonView}
                    onPress={() => {  this.setState({ checked_8: this.state.checked_8 =='Diarhée surtout chez les enfants'? '':'Diarhée surtout chez les enfants'  }); 
                    }}>
                <Text>Diarhée surtout chez les enfants</Text>
                    <RadioButton value={this.state.checked_8}
                    status={checked_8 === 'Diarhée surtout chez les enfants' ? 'checked' : 'unchecked'}
                    />
                </TouchableOpacity>

            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: width
		// backgroundColor: color.appDarkBlue
	},
	radioButtonView: {
          height: 40,
          flexDirection:'row',
          alignItems:'center', 
    }
})

export default QuestionCM;
