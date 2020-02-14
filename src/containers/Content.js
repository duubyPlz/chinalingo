import React from 'react';

import Audio from '../components/Audio';
import Chinese from '../components/Chinese';

import vocabList from '../assets/vocab.json';

const Content = ({isQuestion, dataPath}) => {
  const flatten = (list) => {
    return list.map((lesson) => {
      // in this lesson, concat
      return lesson.entries.map((entry) => {
        return (
          <div>{entry.content}</div>
        );
      });
    });
  };

  // const flattenedList = flatten(vocabList);

  // choose a random word from list
  const currentWord = "\u518d\u898b";
  // const currentWord = "hello hi this is ";

  // Presentational fork:
  // if isquestion return either Audio or english or both
  if (isQuestion) {
    return (
      <>
        <Audio word={currentWord} />
      </>
    );
  } else {
    // else is answer - return chinese
    return (
      <>
        <Chinese word={currentWord} />
      </>
    );
  }
}

export default Content;
