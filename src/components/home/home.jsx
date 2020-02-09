import React, { useEffect, useContext } from 'react';
import RootStore from '../../store/rootStore';
import {ProgressBar } from 'react-materialize'
import PaginationList from "../pagination/pagination";
import Selector from "../selector/selector";
import Search from "../search/search";
import Tags from "../tags/tags";
import { observer } from 'mobx-react';
import PokemonBlock from "../pokemonBlock/pokemon_block";
import s from './home.module.scss'

const Home = () => {
  const { store } = useContext(RootStore);

  useEffect(() => {
    store.pokemonList();
  }, []);

  return (
    <div>
      <h2>Pokemon's</h2>
      <div className={s.selector_container}>
        <Search handleSearch={store.handleSearch}/>
        <Selector changeOption={store.handleLimit} limitOption={store.pagination.limit}/>
      </div>
      <div className={s.main_container}>
        <div className={s.sub_container}>
          {
            store.pokemonData.map((pokemon, index) => {
              return (
                <PokemonBlock pokemon={pokemon} key={index} data={store.pokemonData}/>
              )
            })
          }
          {
            store.state === 'pending'
              ? <ProgressBar/>
              : ''
          }
          {
            store.state === 'null'
              ? <h3>Nothing here</h3>
              : ''
          }
        </div>
        <Tags/>
      </div>
      <PaginationList pagination={store.pagination} handleNavigate={store.handleNavigate}/>
    </div>
  );
}

export default observer(Home);
