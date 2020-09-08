import React from "react";
import {useEffect,useState} from"react"; 
import api from './services/api';
import "./styles.css";
import { response } from "express";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
    setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title:'umbriel',
      url:'https://github.com/ruben.cazalla/react',
      techs:['Node.js','ReactJS']
    })

    setRepositories([...repositories,response.data]); 
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository=>repository.id!==id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>(
          <li key={repository.id}>
           {repository.title}
 
           <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
           </button>
          </li>
        ))}
       </ul>

       

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
