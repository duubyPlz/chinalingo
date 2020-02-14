import React from "react";

import Content from './containers/Content';
import Footer from './components/Footer';

// Local state:
// question or answer (like flashcard front or back)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuestion: true,
      // isFamiliar: false
      isFamiliar: true
    };
  }

  dataPath = "./assets/vocab.json";

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyPress);
    window.addEventListener('click', this.handleClick);
  }

  toggleIsQuestion = () => {
    this.setState({
      isQuestion: !this.state.isQuestion
    });
  }

  handleKeyPress = () => {
    this.toggleIsQuestion();
  };

  handleClick = () => {
    this.toggleIsQuestion();
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
      </>
    );
  }
}

export default App;
