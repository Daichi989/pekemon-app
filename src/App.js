import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon,getPokemon } from './utils/pokemon';

function App() {
const initialURL = "https://pokeapi.co/api/v2/pokemon"
const [loading, setLoading] = useState(true);

useEffect(() => {
  
  const fetchPokemonData = async () => {  
    //ポケモンの全データを取得      
    const res = await getAllPokemon(initialURL);
    //各ポケモンの詳細データを取得
    loadPokemon(res.results);
    // console.log(res.results);
    setLoading(false); 
  }
  fetchPokemonData();

},[])
const loadPokemon =async(data)=>{
  const _pokemonData = await Promise.all(
    data.map((pokemon)=>{
      const pokemonRecord = getPokemon(pokemon.url)
      return pokemonRecord
}) 
  )
}


  return (
    <div className="App">
     {loading ? <h1>ローディング中</h1> : <h1>データ取得完了</h1>}
    </div>
  );
}

export default App;
