import './App.css';

//To store state we will use UseState
//To use hook that refreshes page with nw chat we will use useEffect
import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';

const socket = io.connect('http://localhost:5000');


function App() {
  //Here we have to manage state of message:
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([])

  const sendChat = (e)=>{
    e.preventDefault()
    if(message.trim()){
      socket.emit("chat",{"id": nanoid(), message})
      setChat([...chat, {"id": nanoid(), message}])
      setMessage('')
    }
  }

  useEffect(()=>{
    socket.on("chat", (payload)=>{
      setChat([...chat, payload])
    })
  })
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatbot</h1>
        <ul id='messages'>
          {chat.map((payload, index)=>(<li key = {index}>{payload.message}</li>))}
        </ul>
        <form onSubmit={sendChat}>
          <input type='text' name='chat' placeholder='send text' value={message} autoComplete='off' onChange={(e)=>{
            setMessage(e.target.value)
          }}/>
          <button type='submit'>send</button>

        </form>
      </header>
    </div>
  );
}

export default App;
