import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';

function App() {
  const [post, setPost] = React.useState(null);
  const [state, setState] = React.useState(""); 

  function handleChange(event) {
    setState(event.target.value);
  };

  React.useEffect(() => {
    axios.get('https://morning-coast-76985.herokuapp.com/todo/?format=json').then((response) => {
      setPost(response.data);
    });
  }, []);


  function createPost() {
    if(state !== "" )
    {
      axios
        .post('https://morning-coast-76985.herokuapp.com/todo/?format=json', {
          content: state        
        })
        .then((response) => {
          setPost(response.data);
          setState("");
        });
    }
    else
    {
      alert("Can't add empty values")
    }
  }

  function deletePost(del_content) {
    axios
      .delete('https://morning-coast-76985.herokuapp.com/todo/?format=json',{data: {
        id: del_content     
      }})
      .then((response) => { 
        if (Array.isArray(del_content)) alert("All To-Do item deleted!");
        else alert("To-Do item deleted!");
        setPost(response.data);
      });
  }
  
  if (!post) return null;

  

  return (
    <div className="background">

      <input type="text" value={state} onChange={handleChange} placeholder="Type your To-Do item"/>
      <button onClick={createPost}>Add To-Do Item</button>
      <button onClick={() => deletePost(post)}>Delete All</button>
      {post.map((item,index) => 
          <li key={index}> 
            {item.content } <button onClick ={() => deletePost(item.id)}>Delete</button>
           </li>
      )}
            
    </div>
  );
}

export default App;
