import React from "react";

import Content from './containers/Content';
import Footer from './components/Footer';
import Settings from './components/Settings';

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
