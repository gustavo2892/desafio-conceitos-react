import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: `www.exemplo.com.br`,
      techs: ['ReactJS', 'NodeJS'],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
        {
          repositories.map((repository) => {
            return (
              <li key={repository.id}>
                <h4>{repository.title}</h4>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          }) 
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
