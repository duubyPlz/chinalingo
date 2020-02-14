import React from 'react';

import './Settings.css';

// https://codepen.io/finnhvman/pen/pOeyjE

const Settings = ({toggleFamiliar}) => {
  return (
    <label className="pure-material-switch">
      <input type="checkbox" />
      <span>Switch</span>
    </label>
  );
};

export default Settings;
