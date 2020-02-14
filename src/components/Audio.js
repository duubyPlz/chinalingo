import React from 'react';
import megaphoneIcon from '../assets/megaphone.png';

class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.word = props.entry.content;
    this.module = props.entry.module;

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
    if (this.state.speaker && this.word) {
      this.speak(this.word);
    }
  }

  render() {
    return (
      <div className='audio'>
        module: {this.module}
        <img src={megaphoneIcon} style={{width:100}} />
      </div>
    );
  }
}

export default Audio;
