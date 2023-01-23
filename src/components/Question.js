
import React from 'react';
import { Alert } from 'react-bootstrap';
import './Question.css';

function Question(props) {

    if (!props?.data?.random_translation || props?.data?.random_translation?.length <= 0 || !props?.data?.german_word || !props?.data?.correct_translation) {
        return null;
    }

    const answers = props.data.random_translation.map((a, i) => <div key={i} className='mt-3' onClick={(a) => isCorrectAnswer(a)}>{a}</div>);
    answers.push(<div className='mt-3' onClick={() => isCorrectAnswer(props.data.correct_translation)}>{props.data.correct_translation}</div>);

    function isCorrectAnswer(answer) {
        
        const { setAlertData } = props;
        if(answer === props.data.correct_translation) {
            setAlertData('Correct answer!', 'success');
        } else {
            setAlertData('Incorrect answer!', 'danger');
        }
    }

    return (
      <div className="Question">
            <div className='mt-3'>
                <span>What is the translation of the word: </span>
                <b>{props.data.german_word}</b>
            </div>
            <div className='mt-3'>
                {answers}
            </div>
            <div className='mt-3'>
                { props?.alertData?.text && props?.alertData?.variant ? (
                    <Alert variant={props?.alertData?.variant}>{props?.alertData?.text}</Alert>
                ) : null }
            </div>
      </div>
    );
}

export default Question;