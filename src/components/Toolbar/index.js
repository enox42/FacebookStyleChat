import React from 'react';
import './Toolbar.css';

function Toolbar(props) {
    const { id,title, leftphotoitem,leftItems, rightItems } = props; 
    return (
      <div className="toolbar" key={`toolbaritems-${id}`} id={`tlbaritem-${id}`}>

    {         
      leftphotoitem ?  <div className="left-photo" key={`toolbarPhotoitems-${id}`}>{ leftphotoitem }</div>:null
    }
    {         
      leftItems ?  <div className="left-items" key="leftitems">{ leftItems }</div>:null
    }
    {         
      title ?  <h1 className="toolbar-title" key={`toolbartitle-${id}`}>{ title }</h1>:null
    }
    {         
      rightItems ? <div className="right-items" key="rightitem">{ rightItems }</div>:null
    }
        
        
        
      </div>
    );
}
export default  Toolbar;
