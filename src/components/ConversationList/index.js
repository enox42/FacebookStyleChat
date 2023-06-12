import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ChatPanel from '../ChatPanel';
import ConversationSearch from '../ConversationSearch';
import { panelArr } from '../Messenger';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import './ConversationListItem.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const parentRef = useRef();
  const [ChatPanels, setChatPanels] = useState([]);
  let newElementsArr = [...ChatPanels];
  useEffect(() => {
    getConversations();
    // setChatPanels([...ChatPanels, ...newElementsArr])
  },[])


  const RemoveChatPanel= (pid) => {    
    var FindIndex = panelArr.findIndex(function (el) {
      return el.props.id === pid;
    });
    panelArr.splice(FindIndex, 1)     
    newElementsArr.splice(FindIndex, 1)  
    setChatPanels([...ChatPanels,...panelArr]);
   }


   const AddChatPanel = (pid,pname,pphoto) => {
       
     var flag = newElementsArr.find(cur => cur.id == pid)   
   if(flag){
      pid = newElementsArr.filter(ele => ele != flag)  // turn this array into the same one of the same ID
     }else{
      if (newElementsArr.length<2){
       
        newElementsArr.push(
          <ChatPanel
          key={`userpan-${pid}`} 
          id={pid}  
          name={pname} 
          photo={pphoto}
          Onclick={() => RemoveChatPanel(pid)}
        />);
        panelArr.push(
          <ChatPanel
          key={`userpan-${pid}`} 
          id={pid}  
          name={pname} 
          photo={pphoto}
          Onclick={() => RemoveChatPanel(pid)}
        />);
         setChatPanels(newElementsArr);       
      }
     }
   
 };


  const RenderedCoversionList = (props) => {
    const {id,photo, name, text } = props.data;
    return (
      <div className="conversation-list-item" id={`user-${id}`} ref={parentRef}  onClick={() => AddChatPanel(id,name,photo)} >
        <img className="conversation-photo" src={photo} alt="conversation"  />
        <div className="conversation-info">
          <h1 className="conversation-title">{name }</h1>
          <p className="conversation-snippet">{text }</p>
        </div>
      </div>
    );

  }

   
 const getConversations = () => {
    axios.get('https://randomuser.me/api/?results=20').then(response => {
      let ssn=0
        let newConversations = response.data.results.map(result => {
          return {
            id:ssn++,
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });
        setConversations([...conversations, ...newConversations])
    });
  }

    return (
      <div>
      <div className="scrollable sidebar conversation-list">
        <Toolbar key="toolbarconversion"
          title="Kullanıcılar"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <RenderedCoversionList key={conversation.id} data={conversation}></RenderedCoversionList>           
          )
        }
      </div>
        <div className="content msgbox" key="panels" id="Panelyerlesim">
          {console.log(newElementsArr)}
        {
          ChatPanels.map(chtpnl =>
            chtpnl     
          )
        }
          
          </div>
       </div>
    );

    
}