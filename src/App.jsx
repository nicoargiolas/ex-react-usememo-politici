import { useState, useEffect, useMemo, memo } from 'react'
import './App.css'

// 📌 Milestone 3: Ottimizzare il rendering delle card con React.memo

// Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
// Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
// Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

// Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.

const PoliticianCard = memo(({ name, image, position, biography }) => {
  console.log('Render card:', name);

  return (
    <div className='politician-card'>
      <h3 className='politician-name'> {name} </h3>
      <img src={image} alt={name} />
      <h5 className='politician-position'> {position} </h5>
      <p className='biography'> {biography} </p>
    </div>
  )
})


function App() {

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const loadUsers = async () => {

    const response = await fetch('http://localhost:3333/politicians');
    const data = await response.json();

    setUsers(data);
  }
  useEffect(() => { loadUsers() }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.biography.toLowerCase().includes(query.toLowerCase())
    )
  }, [users, query])

  return (
    <>
      <input className='searchbar' type='text' value={query} onChange={(e) => setQuery(e.target.value)} />
      {filteredUsers.map((u, i) => (
        <PoliticianCard key={i} {...u} />
      ))}
    </>
  )
}

export default App
