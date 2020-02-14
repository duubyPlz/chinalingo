import React from 'react';

import Audio from '../components/Audio';
import Chinese from '../components/Chinese';

import vocabList from '../assets/vocab.json';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEntry: {},
      isFamiliar: props.isFamiliar
    };
  }

  getRandomEntry = () => {
    // const flattenedList = this.flatten(vocabList, this.state.isFamiliar);
    const derp = this.state;
    const flattenedList = this.flatten(vocabList, this.state.isFamiliar);
    const currentIndex = this.getRandomIndex(flattenedList.length);
    return flattenedList[currentIndex];
  };

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

  getRandomIndex = (size) => {
    let min = 0;
    let max = size;

    return Math.floor(min + (Math.random() * (max - min)));
  };

  componentDidMount() {
    const entry = this.getRandomEntry();
    this.setState({
      currentEntry: entry
    });
  }

  componentWillReceiveProps(nextProps) {
    // TODO handle nextProps.isFamiliar change, re-grab a new entry

    if (nextProps.isFamiliar !== this.state.isFamiliar) {
      const newEntry = this.getRandomEntry();

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
        </>
      );
    } else {
      // else is answer - return chinese
      return (
        <>
          <Chinese word={this.state.currentEntry.content} />
        </>
      );
    }
  }
}

export default Content;
