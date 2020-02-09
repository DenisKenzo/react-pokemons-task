import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Checkbox, Button } from 'react-materialize';
import RootStore from '../../store/rootStore'
import s from './tags.module.scss'
import './tags.module.scss'

const Tags = () => {

  const { store } = useContext(RootStore);
  const tagsList = store.tagsList;
  const searchTags = () => {
    store.activeTags = true;
    store.pokemonList();
    store.resetPagination();
  };

  const handleTags = e => {
    const event = e.target.value;
    tagsList.forEach((pokemon) => {
      if (pokemon.type === event) {
        store.handleTags(pokemon.type);
        pokemon.checked = !(pokemon.checked)
      }
      return pokemon;
    })
  };

    return (
      <div className={s.tags_block}>
        <form onSubmit={(e) => {e.preventDefault()}}>
          {
            tagsList ?
              tagsList.map((pokemon, index) => {
                return (
                <p className={'pokemon ' + pokemon.type} key={index}>
                  <Checkbox
                    id={`${index + 10}`}
                    onChange={e => handleTags(e)}
                    checked={pokemon.checked}
                    filledIn={true}
                    value={pokemon.type}
                    label={pokemon.type}
                  />
                </p>)
              })
              : null
          }
          <Button
            type="submit"
            onClick={searchTags}
          >
            Submit
          </Button>
        </form>
      </div>
    )
};
export default observer(Tags)
