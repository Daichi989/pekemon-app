import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon,getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
const initialURL = "https://pokeapi.co/api/v2/pokemon"
const [loading, setLoading] = useState(true);
const [pokemonData, setPokemonData] = useState([]);
const [nextUrl, setNextUrl] = useState('');
const [prevUrl, setPrevUrl] = useState('');

useEffect(() => {
  
  const fetchPokemonData = async () => {  
    //ポケモンの全データを取得      
    const res = await getAllPokemon(initialURL);
    //各ポケモンの詳細データを取得
    loadPokemon(res.results);
    // console.log(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false); 
  }
  fetchPokemonData();

},[])
const loadPokemon = async(data)=>{
  let _pokemonData = await Promise.all(
    data.map((pokemon)=>{
      let pokemonRecord = getPokemon(pokemon.url)
      return pokemonRecord
}) 
  )
  setPokemonData(_pokemonData);
}
console.log(pokemonData);

const handleNextPage = async () => {
  setLoading(true);
  let data = await getAllPokemon(nextUrl);
  await loadPokemon(data.results);
  setNextUrl(data.next);  
  setPrevUrl(data.previous);
  setLoading(false);
}

const handlePrevPage = async () => {
  if (!prevUrl) return;
  setLoading(true);
  let data = await getAllPokemon(prevUrl);
  await loadPokemon(data.results);
  setNextUrl(data.next);
  setPrevUrl(data.previous);
  setLoading(false);
}

  return (
    <>
    <Navbar />
    <div className="App">
      {loading ? <h1>Loading...</h1> : (
        <>
        <div className="grid-container">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />
          })}
        </div>
        <div className='btn'>
        <button onClick={handlePrevPage}>前へ</button>
        <button onClick={handleNextPage}>次へ</button>
        </div>
        </>
      )}
    </div>
    </>
  );
}

export default App;
