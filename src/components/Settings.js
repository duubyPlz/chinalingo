import React, {useRef} from 'react';

import './Settings.css';

// https://codepen.io/finnhvman/pen/pOeyjE

const Settings = ({setFamiliar}) => {
  let checkboxValue = useRef(null);

  return (
    <label className="pure-material-switch">
      <input
        type="checkbox"
        ref={checkboxValue}
        onChange={() => {
          setFamiliar(checkboxValue.current.checked);
        }} />
      <span></span>
    </label>
  );
};

export default Settings;
