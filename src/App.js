import React from 'react';
import './App.css';
import Question from './components/Question';
import { Button } from 'react-bootstrap';

class App extends React.Component {

  state = { listOfQuestions: [], alertData: { text: '', variant: '' } };

  componentDidMount() {
    this.getNextQuestion();
  }

  getNextQuestion() {
    fetch('https://frontend-interview-api.bioz.com/question_data')
    .then((response) => response.json())
    .then((data) => {
        const { listOfQuestions } = this.state;
        const listOfQuestionsTemp = [...listOfQuestions];
        listOfQuestionsTemp.push(data);
        this.setState({ listOfQuestions: listOfQuestionsTemp, alertData: { text: '', variant: '' } });
    });
  }

  setAlertData(text, variant) {
    this.setState({ alertData: { text, variant } });
  }

  render() {
    const { listOfQuestions, alertData } = this.state;
    const currentQuestionData = listOfQuestions.length > 0 ? listOfQuestions[listOfQuestions.length - 1] : {};
    return (
      <div className="App">
        <Button className='my-3' variant="primary" onClick={() => this.getNextQuestion()}>Next question</Button>
        <Question data={currentQuestionData} alertData={alertData} setAlertData={(text, variant) => this.setAlertData(text, variant) } />
      </div>
    );
  }

}

export default App;
