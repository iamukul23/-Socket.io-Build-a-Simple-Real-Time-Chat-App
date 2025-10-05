import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
const socket =io.connect("http://localhost:3000");
const App = () => {
  
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState("");

  const handlemessage= () =>{
  
    socket.emit("send_message",{msg: input});
    setInput("");

  }
  useEffect(()=>{
   socket.on("receive_message",(data)=>{
   setMessages(data);
   })
  },[]);

 
  return (
    <div>
      <input type="text"  placeholder='Enter your msg '
      onChange={(e)=>setInput(e.target.value)} value={input}/>
     <button onClick={handlemessage} >send</button>
     <div>
   {messages}
     </div>
    </div>
  )
}


export default App
