import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import './Messenger.css';

const panelArr=[];
export { panelArr };

class Messenger extends Component {
  state={
    panels:[]
  }
  render() {
    return (
      <div className="messenger" key="messengers">
          <ConversationList/>             
      </div>
    );
  }
}
export default Messenger;