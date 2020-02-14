import React from 'react';

class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      speaker: null
    };
  }

  initSpeech = () => {
    const speaker = new SpeechSynthesisUtterance();
    speaker.lang = 'zh-HK';

    return speaker;
  };

  speak = (text) => {
    this.speaker.text = text;
    window.speechSynthesis.speak(this.speaker);
  };

  componentDidMount() {
    const ssu = this.initSpeech(); 
    this.setState({
      speaker: ssu
    });

    if (this.props.word) {
      this.speak(this.props.word);
    }
  }

  render() {
    return (
      <div className='audio'>
        &#x1f50a;
      </div>
    );
  }
}

export default Audio;
