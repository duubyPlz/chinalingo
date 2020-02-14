import React from 'react';

import Audio from '../components/Audio';
import Chinese from '../components/Chinese';

import vocabList from '../assets/vocab.json';

const Content = ({isQuestion, dataPath}) => {
  const flatten = (list) => {
    return list.map((lesson) => {
      // in this lesson, concat
      return lesson.entries.map((entry) => {
        return entry;
      });
    });
  };

  const getRandomEntry = () => {
    const flattenedList = flatten(vocabList);
    const currentIndex = getRandomIndex(flattenedList.length);
    return flattenedList[currentIndex];
  };

  const getRandomIndex = (size) => {
    let min = 0;
    let max = size;

    return min + (Math.random() * (max - min));
  };

  // choose a random word from list
  // const currentWord = "\u518d\u898b";
  const currentEntry = getRandomEntry();

  // Presentational fork:
  // if isquestion return either Audio or english or both
  if (isQuestion) {
    return (
      <>
        <Audio entry={currentEntry} />
      </>
    );
  } else {
    // else is answer - return chinese
    return (
      <>
        <Chinese word={currentEntry.content} />
      </>
    );
  }
}

export default Content;
