import { useState, useEffect } from 'react'
import './App.css'

// 💡 Premessa: Stai costruendo una pagina per visualizzare una lista di politici. Tuttavia, vuoi evitare calcoli inutili e ottimizzare la performance del tuo componente. Segui le milestone per migliorare progressivamente il codice

// 📌 Milestone 1: Recuperare e visualizzare i dati

// Effettua una chiamata API a
// https://boolean-spec-frontend.vercel.app/freetestapi/politicians
// Salva la risposta in uno stato React (useState).
// Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:
// Nome (name)
// Immagine (image)
// Posizione (position)
// Breve biografia (biography)

// Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.

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

  const loadUsers = async () => {

    const response = await fetch('http://localhost:3333/politicians');
    const data = await response.json();

    setUsers(data);
  }
  useEffect(() => { loadUsers() }, []);

  return (
    <>
      {users.map((u, i) => (
        <PoliticianCard key={i} {...u} />
      ))}
    </>
  )
}

export default App
