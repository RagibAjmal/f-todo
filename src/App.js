import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from 'react';

function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('https://morning-coast-76985.herokuapp.com/todo/?format=json').then((response) => {
      setPost(response.data);
    });
  }, []);


  function createPost() {
    axios
      .post('https://morning-coast-76985.herokuapp.com/todo/?format=json', {
        content: "Hello World!"        
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function deletePost(del_content) {
    axios
      .delete('https://morning-coast-76985.herokuapp.com/todo/?format=json',{data: {
        id: del_content     
      }})
      .then((response) => {
        console.log(del_content);
        if (Array.isArray(del_content)) alert("All To-Do item deleted!");
        else alert("To-Do item deleted!");
        setPost(response.data);
      });
  }
  
  if (!post) return null;

  

  return (
    <div>

      <button onClick={createPost}>Add To-Do Item</button>
      <button onClick={() => deletePost(post)}>delete</button>
      {post.map((item,index) => 
          <li key={index}> 
            {item.content } <button onClick={() => deletePost(item.id)}>delete</button>
           </li>
      )}
            
    </div>
  );
}

export default App;
