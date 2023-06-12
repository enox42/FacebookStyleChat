import React from 'react';
import './ToolbarButton.css';

function ToolbarButton(props) {
  const { icon,onClick } = props;
    return (     
      <i className={`toolbar-button ${icon}`} onClick= {onClick}/>
    );
}

export default  ToolbarButton;