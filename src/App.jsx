import { useState, useEffect, useMemo } from 'react'
import './App.css'

// 📌 Milestone 2: Implementare la ricerca ottimizzata

// Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
// Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
// ❌ Non usare useEffect per aggiornare l’array filtrato.

// Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.

const PoliticianCard = ({ name, image, position, biography }) => {
  return (
    <div className='politician-card'>
      <h3 className='politician-name'> {name} </h3>
      <img src={image} alt={name} />
      <h5 className='politician-position'> {position} </h5>
      <p className='biography'> {biography} </p>
    </div>
  )
}


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
