import './App.css';
import axios from 'axios';
import React  from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import { AnimateSharedLayout,motion } from "framer-motion"

function App() {

  const [post, setPost] = React.useState(null);
  const [state, setState] = React.useState(""); 
  const [background, setBackground] = React.useState("linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"); 
  const meta={}
  

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

  function deletePost(item) {
    axios
      .delete('https://morning-coast-76985.herokuapp.com/todo/?format=json',{data: {
        id: item     
      }})
      .then((response) => { 
        if (Array.isArray(item)) alert("All To-Do item deleted!");
        else alert("To-Do item deleted!");
        setPost(response.data);
      });
  }

  function deletePostdrag(event, info, item) {
    if (info.point.x - item.start > 200) {
      axios
        .delete('https://morning-coast-76985.herokuapp.com/todo/?format=json', {
          data: {
            id: item.id
          }
        })
        .then((response) => {
          if (Array.isArray(item)) alert("All To-Do item deleted!");
          else alert("To-Do item deleted!");
          setPost(response.data);
          setBackground("linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)");
        });
    };
    
  }

  function changecolordrag(event , info , item){
    if(info.point.x - item.start > 200){ setBackground("linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)") }  
    else {setBackground("linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)")};
  }

  function startinfodrag(event , info , item){
    if (! ('start' in item)) { 
      item['start'] = info.point.x;
    }    
  }
  
  if (!post) return null;  

  if (document.monetization){
    document.monetization.addEventListener('monetizationstart',()=> {
        document.getElementById('non-monetization').classList.add('hidden');
    });
    document.monetization.addEventListener('monetizationstart',()=> {
      document.getElementById('monetization').classList.remove('hidden');
  });
}

  return (
    <html>
      <head>
        <meta name="monetization" content="$ilp.uphold.com/LJmbPn7WD4JB"></meta>
      </head>
      <body>
        <div id="non-monetization" className="background-plain">
          <div>
            <input type="text" value={state} onChange={handleChange} placeholder="Type your To-Do item"/>
            <button onClick={createPost}>Add Item</button>
            <button onClick={() => deletePost(post)}>Delete All</button>
          </div>
          {post.map((item, index) =>
            <li key={index}>
              {item.content} <button onClick={() => deletePost(item.id)}>Delete</button>
            </li>
          )}
        </div>
        <div id="monetization"className="background hidden" style={{ background: background }}>

          <div className="card">
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <InputText placeholder="Keyword" value={state} onChange={handleChange} placeholder="Type your To-Do item" />
                  <Button label="Add Item" onClick={createPost} />
                  <Button label="Delete All" onClick={() => deletePost(post)} />
                </div>
              </div>
            </div>
          </div>

          {post.map((item, index) =>

            <motion.ul drag="x" layout key={index} dragElastic={0.2}
              dragConstraints={{ left: 0, right: 100 }} dragMomentum={false}
              onDragStart={(event, info) => startinfodrag(event, info, item)}
              onDragEnd={(event, info) => deletePostdrag(event, info, item)}
              onDrag={(event, info) => changecolordrag(event, info, item)}
            >
              {item.content}
            </motion.ul>
          )}

        </div>
      </body>
    </html>

  );
}

export default App;
