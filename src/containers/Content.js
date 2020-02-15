import React from 'react';

import Audio from '../components/Audio';
import Chinese from '../components/Chinese';

import vocabList from '../assets/test.json';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEntry: {},
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
    // const flattenedList = this.flatten(vocabList, this.state.isFamiliar);
    const flattenedList = this.flatten(vocabList, this.state.isFamiliar);
    const currentIndex = this.getRandomIndex(flattenedList.length);
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
  * genNextEntry() {
    const shuffleList = (list) => {
      // knuth/fisher-yates shuffle
      for (let i=list.length-1; i>0; i--) {
        const min = 0;
        let max = i;
        let j = this.getRandomNumber(min, max);

        // swap list[i] and list[j]
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
    };

    const flattenedList = this.flatten(vocabList, this.state.isFamiliar);

    while (true) {
      // randomise
      let shuffledList = shuffleList(flattenedList);

      // spit out entries one by one
      for (let entry of shuffledList) {
        yield entry;
      }
    }
  };

  componentDidMount() {
    // const entry = this.getRandomEntry();
    const entry = this.genNextEntry();
    this.setState({
      currentEntry: entry
    });
  }

  // https://alligator.io/react/get-derived-state/
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
  componentWillReceiveProps(nextProps) {
    // TODO handle nextProps.isFamiliar change, re-grab a new entry

    if (nextProps.isFamiliar !== this.state.isFamiliar) {
      // const newEntry = this.getRandomEntry();
      const newEntry = this.genNextEntry();

      this.setState({
        currentEntry: newEntry,
        isFamiliar: nextProps.isFamiliar
      });
    }

    if (nextProps.isQuestion) {
      const newEntry = this.getRandomEntry();
      this.setState({
        currentEntry: newEntry
      });
    }
  }

  render() {
    if (this.props.isQuestion) {
      return (
        <>
          <Audio entry={this.state.currentEntry} />
          familiar: {this.state.isFamiliar.toString()}
        </>
      );
    } else {
      // else is answer - return chinese
      return (
        <>
          <Chinese word={this.state.currentEntry.content} />
          familiar: {this.state.isFamiliar.toString()}
        </>
      );
    }
  }
}

export default Content;
