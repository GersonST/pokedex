import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Info from "../../pages/Info";

export default function PokemonList() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [pokemonNext, setPokemonNext] = useState("");
  const [pokemonPrevious, setPokemonPrevious] = useState("");

  const getPokemon = async () => {
    try {
      const url = "http://pokeapi.co/api/v2/pokemon/";
      const response = await axios.get(url);
      console.log(response);

      setPokemonArray(response.data.results);
      setPokemonNext(response.data.next);
      setPokemonPrevious(response.data.previous);
    } catch (e) {
      console.log(e);
    }
  };

  const getPokemonNext = async () => {
    try {
      const url = pokemonNext;
      const response = await axios.get(url);

      setPokemonArray(response.data.results);
      setPokemonPrevious(response.data.previous);
      setPokemonNext(response.data.next);
    } catch (e) {
      console.log(e);
    }
  };

  const getPokemonPrevious = async () => {
    try {
      const url = pokemonPrevious;
      const response = await axios.get(url);

      setPokemonArray(response.data.results);
      setPokemonPrevious(response.data.previous);
      setPokemonNext(response.data.next);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    console.log(pokemonArray);
    console.log(pokemonPrevious);
    console.log(pokemonNext);
  }, [pokemonArray]);

  const handleNext = () => {
    getPokemonNext();
  };

  const handlePrevious = () => {
    getPokemonPrevious();
  };

  return (
    <div>
      <div>
        <ul>
          {pokemonArray.map((poke) => {
            return (
              <Link to={Info} key={poke.url}>
                <li key={poke.url}>{poke.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div>
        <button onClick={() => handlePrevious()}>Voltar</button>
        <button onClick={() => handleNext()}>Avançar</button>
      </div>
    </div>
  );
}
