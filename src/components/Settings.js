import React, {useRef} from 'react';

import './Settings.css';
import optionsIcon from '../assets/options.png';

// https://codepen.io/finnhvman/pen/pOeyjE

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.checkboxValue = React.createRef();

    this.state = {
      visible: false
    };
  }

  handleToggleVisible = () => {
    this.handleSetVisible(!this.state.visible);
  };

  handleSetVisible = (value) => {
    this.setState({
      visible: value
    });
  };

  handleClick = (event) => {
    if (!this.state.visible) {
      return;
    }
    
    const tagName = event.target.tagName;
    if (tagName === 'IMG' ||
        tagName === 'BUTTON' ||
        tagName === 'SPAN') {
      return;
    }

    this.handleSetVisible(false);
  };

  // TODO v don't need this? v
  // https://advancedweb.hu/global-listener-patterns-in-react/
  // https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  render() {
    // somehow link this.props.isFamiliar to input

    return (
      <>
        {
          this.state.visible ?
          <div className='settings'>
            <label className="switch" id='switch-familiar'>
              <input
                type="checkbox"


                ref={this.checkboxValue}
                onChange={() => {
                  this.props.setFamiliar(this.checkboxValue.current.checked);
                }} />
              <span className="switch-option">familiar</span>
            </label>
          </div>
          : null
        }

        {/* FIXME button img: https://stackoverflow.com/questions/49891399/icon-inside-button-does-not-trigger-attached-function-on-react */}
        <button
          className='toggle-settings primary'
          onClick={this.handleToggleVisible.bind(this)}
        >
          <img
            src={optionsIcon}
            style={{width: 20}}
          />
        </button>
      </>
    );
  }
}

export default Settings;
