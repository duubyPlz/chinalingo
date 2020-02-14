import React from 'react';

const Audio = ({vocabList}) => {
  // use vocabList to grab random entry, get entry's module
  
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

  const flattenedList = flatten(vocabList);


  return (
    <></>
  );
};

export default Audio;
