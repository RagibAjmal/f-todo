import './App.css';
import axios from 'axios';
import React  from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';

function App() {

  const [post, setPost] = React.useState(null);
  const [state, setState] = React.useState(""); 

  React.useEffect(() => {
    axios.get('https://morning-coast-76985.herokuapp.com/todo/?format=json').then((response) => {
      setPost(response.data);
    });
  }, []);

  function handleChange(event) {
    setState(event.target.value);
  };

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

      <div className="card">
        <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-4">
            <div className="p-inputgroup">
              <InputText placeholder="Keyword" value={state} onChange={handleChange} placeholder="Type your To-Do item"/>
              <Button label="Add Item" onClick={createPost}/>
              <Button label="Delete All" onClick={() => deletePost(post)}/>
            </div>
          </div>
        </div>
      </div>
            
      {post.map((item,index) => 
        <li key={index}> 
         {item.content } <button onClick ={() => deletePost(item.id)}>Delete</button>
        </li>
      )}
            
    </div>
  );
}

export default App;
