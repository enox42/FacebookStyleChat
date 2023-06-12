import React, { Component } from 'react';

const ChatPanelContext=React.createContext();
//provider,consumer


export  class ChatPanelProvider extends Component {
  state={
    count:0,
    panels:[]
  }
  render() {
    return (
      <ChatPanelContext.Provider value={this.state}>
        {this.props.children}
      </ChatPanelContext.Provider>
    )
  }
}
const ChatPanelConsumer=ChatPanelContext.Consumer;
export default ChatPanelConsumer;