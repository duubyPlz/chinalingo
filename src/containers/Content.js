import React from 'react';

import Audio from '../components/Audio';
import English from '../components/English';
import Chinese from '../components/Chinese';

const Content = ({isQuestion}) => {
  // if isquestion return either Audio or english or both
  if (isQuestion) {
    return (
      <>
        <Audio />
        <English />
      </>
    );
  } else {
    // else is answer - return chinese
    return (
      <>
        <Chinese />
      </>
    );
  }
}

export default Content;
