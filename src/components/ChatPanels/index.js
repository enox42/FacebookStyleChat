import { useEffect, useState } from 'react';
import ChatPanel from '../ChatPanel';
import { obj } from '../Messenger';


function ChatPanels(props) { 
    const [ChatPanels, setChatPanels] = useState(obj);
    useEffect(() => {
        getpanels()
      },[])

const getpanels = () => {
            let renderpanels = obj.map(result => {         
            <ChatPanel
                key={result.id}
                id={result.id}
                name={result.name}
                photo={result.photo}        
            />          
        });
        setChatPanels([...ChatPanels, ...renderpanels])   
  }


  return(
    <div className="content msgbox" key="panels">
        
        {ChatPanels.map((panel, index) => (
        <div key={`userpanels-${obj.id}`} id={`userpanel-${obj.id}`} >
         {panel}
        </div>
      ))}

    </div>
  )
}
export default ChatPanels;