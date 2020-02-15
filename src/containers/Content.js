import React from 'react';

import Audio from '../components/Audio';
import Chinese from '../components/Chinese';

import vocabList from '../assets/vocab.json';

class Content extends React.Component {
  constructor(props) {
    super(props);

    // const entry = this.getRandomEntry();
    // const entryGenerator = this.genNextEntry.call(this, this.state.isFamiliar);

    const flattenedList = this.flatten(vocabList, props.isFamiliar);

    const entryGenerator = this.genNextEntry(flattenedList, this.getRandomNumber);
    const entry = entryGenerator.next().value;
    this.state = {
      flattenedList: flattenedList,
      entryGenerator: entryGenerator,
      currentEntry: entry.entry,
      currentIndex: entry.index,
      isFamiliar: props.isFamiliar
    };
  }

  flatten = (list, isFamiliar) => {
    /*
    [
      {
        "entries": [
          {
            "isFamiliar": false,
            "module": "1",
            "content": "\u518d\u898b"
          },
          {
            "isFamiliar": false,
            "module": "1",
            "content": "\u4f60"
          },
          {
            "isFamiliar": false,
            "module": "1",
            "content": "\u597d"
          }
        ],
        "lesson": "1"
      },
    */
    
    const flattenedList = [];

    for (const lesson of list) {
      for (const entry of lesson.entries) {
        if (entry.isFamiliar === isFamiliar) {
          flattenedList.push(entry);
        }
      }
    }

    return flattenedList;
  };

  getRandomEntry = () => {
    const currentIndex = this.getRandomIndex(this.state.flattenedList.length);
    return flattenedList[currentIndex];
  };

  getRandomIndex = (size) => {
    let min = 0;
    let max = size;
    return this.getRandomNumber(min, max);
  };

  getRandomNumber = (min, max) => {
    return Math.floor(min + (Math.random() * (max - min)));
  };

  // TODO make this use `.done` instead of infinite
  // every time generator function is called, check if .done
  // need to make a third component (not just front & back flash card sides), render that when .done
  // https://www.aaron-powell.com/posts/2014-01-13-functions-that-yield-mutliple-times/
  * genNextEntry(flattenedList, getRandomNumber) {
    const shuffleList = (list) => {
      // knuth/fisher-yates shuffle
      for (let i=list.length-1; i>0; i--) {
        const min = 0;
        let max = i;
        let j = getRandomNumber(min, max);

        // swap list[i] and list[j]
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }

      return list;
    };

    while (true) {
      // randomise
      let shuffledList = shuffleList(flattenedList);

      // spit out entries one by one
      for (let i=0; i<shuffledList.length; i++) {
        let wantedEntry = shuffledList[i];
        // TODO maybe better way to do this:
        yield {
          entry: wantedEntry,
          index: i
        };
      }
    }
  };

  // https://alligator.io/react/get-derived-state/
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
  componentWillReceiveProps(nextProps) {
    // TODO handle nextProps.isFamiliar change, re-grab a new entry

    if (nextProps.isFamiliar !== this.state.isFamiliar) {
      // const newEntry = this.getRandomEntry();
      const newEntry = this.state.entryGenerator.next().value;

      this.setState({
        currentEntry: newEntry.entry,
        currentIndex: newEntry.index,
        isFamiliar: nextProps.isFamiliar
      });
    }

    if (nextProps.isQuestion) {
      // const newEntry = this.getRandomEntry();
      const newEntry = this.state.entryGenerator.next().value;
      this.setState({
        currentEntry: newEntry.entry,
        currentIndex: newEntry.index,
      });
    }
  }


  render() {
    return (
      <>
        total: {this.state.flattenedList.length}
        current: {this.state.currentIndex}
        <CurrentModule 
          isQuestion={this.props.isQuestion}
          currentEntry={this.state.currentEntry}
          isFamiliar={this.state.isFamiliar}
         />
      </>
    );
  }
}

const CurrentModule = ({isQuestion, currentEntry, isFamiliar}) => {
  if (isQuestion) {
    return (
      <>
        <Audio entry={currentEntry} />
        familiar: {isFamiliar.toString()}
      </>
    );
  } else {
    // else is answer - return chinese
    return (
      <>
        <Chinese word={currentEntry.content} />
        familiar: {isFamiliar.toString()}
      </>
    );
  }
};

export default Content;
