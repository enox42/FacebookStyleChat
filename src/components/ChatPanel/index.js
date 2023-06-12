import Picker from '@emoji-mart/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import posed from 'react-pose';
import Message from '../Message';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './panel.css';
const MY_USER_ID = 'apple';

 function ChatPanel(props) {  
  const {id,name,photo,Onclick} = props;
  const [messages, setMessages] = useState([]);
  const [visible, setIsVisible] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [input, setInput] = useState("");

  

    // const index = data.findIndex(emp => emp.id === data.id)      
    // data.splice(index, 1)    

 
  
  const handleChange = (e) => {
    console.log(e)
    
  }

  const closeemoji=() =>{
    setShowEmojis(false);
  }   
  
 const addEmoji = (emoji) => {   
    setInput(input + emoji.native);
  };

 const MessagePanelBox = posed.div({
    visible: { opacity: 1,
    applyAtStart:{display:"block"} 
  },
    hidden: { 
      opacity: 0,
      applyAtEnd:{display:"none"} 
    }
    
  });

  const onReactionClick = () => {
    setShowEmojis(!showEmojis);
   }

  const handleMinimizeToggle = () => {
    console.log("test")
     setIsVisible(!visible);
    };


  useEffect(() => {
    getMessages();
  },[])

  
  const getMessages = () => {
     var tempMessages = [
        {
          id: 1,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 2,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 3,
          author: 'orange',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 4,
          author: 'apple',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 5,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 6,
          author: 'apple',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 7,
          author: 'orange',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 8,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
        {
          id: 9,
          author: 'apple',
          message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          timestamp: new Date().getTime()
        },
        {
          id: 10,
          author: 'orange',
          message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          timestamp: new Date().getTime()
        },
      ]
      setMessages([...messages, ...tempMessages])
  }
  


  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }
 
    return (     
      <MessagePanelBox pose={visible ? 'visible' : 'hidden'} key={`msgpnl-${id}`} >
      <div className="message-list" key={`toolbar-${id}`} id={`Panelcontent-${id}`} >
        <Toolbar key={`tollbar-${id}`} id={id}
         leftphotoitem={[<img key={`userphoto-${id}`} className="user-photo" src={photo} alt={name}  />]}
          title={name}
          rightItems={[
            <ToolbarButton onClick={Onclick} key={`delete-${id}`} icon="ion-ios-close" />,
            <ToolbarButton onClick={() => handleMinimizeToggle()} key={`minimize-${id}`} icon="ion-ios-remove" />,
            <ToolbarButton key={`video-${id}`} icon="ion-ios-videocam" />,
            <ToolbarButton key={`phone-${id}`} icon="ion-ios-call" />
          ]}
        />

 <div className="message-list-containerbox">
    <div className="message-list-container">{renderMessages()}</div>
          
          <div className="compose">
            <ToolbarButton key={`photo-${id}`} icon="ion-ios-camera" />,
            <ToolbarButton key={`image-${id}`} icon="ion-ios-image" />,
            <ToolbarButton key={`audio-${id}`} icon="ion-ios-mic" />,
            <ToolbarButton key={`emoji-${id}`} icon="ion-ios-happy" onClick={onReactionClick} />            
            <input type="text" className="compose-input" value={input} onChange={e => setInput(e.target.value)}  placeholder="Aa" />      
           </div>
          {showEmojis && 
              <div className="reactions" >
              <Picker
                set="twitter"
                emojiButtonSize={36}
                emojiSize={30} 
                perLine={8}
                previewPosition="none"
                showSkinTones={false}
                onEmojiSelect={addEmoji}
                onClickOutside={closeemoji}
                locale="tr"
              />
            </div>
            }
        </div>
      </div>
      </MessagePanelBox>   
    );
}
export default ChatPanel;