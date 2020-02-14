import React, {useRef} from 'react';

import './Settings.css';

// https://codepen.io/finnhvman/pen/pOeyjE

const Settings = ({setFamiliar}) => {
  let checkboxValue = useRef(null);

  return (
    <>
      <div className='settings'>
        <label className="switch" id='switch-familiar'>
          <input
            type="checkbox"
            ref={checkboxValue}
            onChange={() => {
              setFamiliar(checkboxValue.current.checked);
            }} />
          <span>familiar</span>
        </label>
      </div>
      <button className='toggle-settings'>
        &#x2699;
      </button>
    </>
  );
};

export default Settings;
