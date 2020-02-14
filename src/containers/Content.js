import React from 'react';

import Audio from '../components/Audio';
import Chinese from '../components/Chinese';

import vocabList from '../assets/vocab.json';

const Content = ({isQuestion, dataPath}) => {
  // Can filter vocabList by lesson

  // Presentational fork:
  // if isquestion return either Audio or english or both
  if (isQuestion) {
    return (
      <>
        <Audio vocabList={vocabList} />
      </>
    );
  } else {
    // else is answer - return chinese
    return (
      <>
        <Chinese vocabList={vocabList} />
      </>
    );
  }
}

export default Content;
