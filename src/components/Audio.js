import React from 'react';

class Audio extends React.Component {
  constructor(props) {
    super(props);

    const ssu = this.initSpeech(); 
    this.state = {
      speaker: ssu
    };
  }

  initSpeech = () => {
    let speaker = new SpeechSynthesisUtterance();
    speaker.lang = 'zh-HK';

    return speaker;
  };

  speak = (text) => {
    this.state.speaker.text = text;
    this.state.speaker.pitch = 1;
    this.state.speaker.rate = 0.5;
    window.speechSynthesis.speak(this.state.speaker);
  };

  componentDidMount() {
    if (this.state.speaker && this.props.word) {
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
