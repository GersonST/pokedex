import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Info from "../../pages/Info";
import "./styles.scss";

export default function PokemonList() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [pokemonNext, setPokemonNext] = useState("");
  const [pokemonPrevious, setPokemonPrevious] = useState("");
  const [initialUrl, setInitialUrl] = useState(
    "http://pokeapi.co/api/v2/pokemon/"
  );

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await axios.get(initialUrl);
        console.log(response);
        setPokemonArray(response.data.results);
        setPokemonNext(response.data.next);
        setPokemonPrevious(response.data.previous);
      } catch (e) {
        console.log(e);
      }
    };
    getPokemon();
  }, [initialUrl]);

  function handlePokemonNext() {
    setInitialUrl(pokemonNext);
  }

  function handlePokemonPrevious() {
    setInitialUrl(pokemonPrevious);
  }

  return (
    <div className="container">
      <div className="pokemon-list">
        <ul>
          {pokemonArray.map((poke) => {
            return <li key={poke.url}>{poke.name}</li>;
          })}
        </ul>
        <div>
          <button
            className="previous-btn"
            onClick={() => {
              handlePokemonPrevious();
            }}
          >
            Voltar
          </button>
          <button
            className="next-btn"
            onClick={() => {
              handlePokemonNext();
            }}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}
