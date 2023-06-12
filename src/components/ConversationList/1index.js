import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ChatPanel from '../ChatPanel';
import ConversationSearch from '../ConversationSearch';
import { obj } from '../Messenger';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import './ConversationListItem.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const parentRef = useRef();
  const [ChatPanels, setChatPanels] = useState(obj);
  useEffect(() => {
    getConversations()
  },[])

 
  
   const AddChatPanel = (pid,pname,pphoto) => {
    console.log(obj)
    var flag = obj.find(cur => cur.id == pid)   
    if(flag){
      pid = obj.filter(ele => ele != flag)  // turn this array into the same one of the same ID
    }else{
      obj.push({   
        id: pid,
        name:pname,
        photo:pphoto ,
        onremove:false,
        onminimize:false          
        });		// If you don't have direct PUSH
        let newElementsArr = [...ChatPanels];
        if (newElementsArr.length<2){ //panel sayısı max. 2 diğer paneller küçük görünüm olcak
        const newElement = React.createElement('div', {id:'userpanel-'+pid,key: 'ele'+ new Date().getTime()}, <ChatPanel
        key={pid}
        id={pid}
        name={pname}
        photo={pphoto}
        onremove={false}
        onminimize={false}          
      />,);
        
        setChatPanels(ChatPanels => [...ChatPanels,newElement]);
        
      }
 };
}
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
        <div className="content msgbox" key="panels">
          {ChatPanels}
          </div>
       </div>
    );

    
}