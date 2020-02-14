import React from "react";

import Content from './containers/Content';
import Footer from './components/Footer';
import Settings from './components/Settings';

import './App.css';

// Local state:
// question or answer (like flashcard front or back)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuestion: true,
      isFamiliar: false
    };

    this.handleSetFamiliar = this.handleSetFamiliar.bind(this);
  }

  dataPath = "./assets/vocab.json";

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyPress);
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyPress);
    window.removeEventListener('click', this.handleClick);
  }

  toggleIsQuestion = () => {
    this.setState({
      isQuestion: !this.state.isQuestion
    });
  }

  handleKeyPress = (event) => {
    this.toggleIsQuestion();
  };

  handleClick = (event) => {
    const tagName = event.target.tagName;
    if (tagName !== 'BODY' && tagName !== 'DIV') {
      return;
    }

    this.toggleIsQuestion();
  };

  handleSetFamiliar = (checked) => {
    this.setState({
      isFamiliar: checked
    });
  };

  render() {
    return (
      <>
        <Content 
          isFamiliar={this.state.isFamiliar}
          isQuestion={this.state.isQuestion}
          dataPath={this.dataPath}
        />
        <Footer isQuestion={this.state.isQuestion} />
        <Settings setFamiliar={this.handleSetFamiliar} />
      </>
    );
  }
}

export default App;
