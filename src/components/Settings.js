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
    const tagName = event.target.tagName;
    if (tagName !== 'BODY' && tagName !== 'DIV') {
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
                  setFamiliar(this.checkboxValue.current.checked);
                }} />
              <span>familiar</span>
            </label>
          </div>
          : null
        }

        <button
          className='toggle-settings primary'
          onClick={this.handleToggleVisible.bind(this)}
        >
          <img src={optionsIcon} style={{width: 20}}/>
        </button>
      </>
    );
  }
}

export default Settings;
