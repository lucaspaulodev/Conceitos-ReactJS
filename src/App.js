import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";
import { findAllByTitle } from "@testing-library/react";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data)
    })
}, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Projeto ${Date.now()}`,
      url:''
    })
    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const indexOfRepository = repositories.indexOf(repository => repository.ide === id)
    repositories.splice(indexOfRepository, 1)
    setRepositories([...repositories])
    api.delete(`repositories/${id}`)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            {console.log(repositories)}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
