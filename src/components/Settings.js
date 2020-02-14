import React from 'react';

// https://codepen.io/finnhvman/pen/pOeyjE

const Settings = ({toggleFamiliar}) => {
  return (
    <button onClick={() => toggleFamiliar()}>TOGGLE FAM</button>
  )
};

export default Settings;
