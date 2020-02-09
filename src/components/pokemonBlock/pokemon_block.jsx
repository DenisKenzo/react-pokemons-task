import React from "react";
import s from './pokemon_block.module.scss'
import Modal from "../modal/modal";

export default class PokemonBlock extends React.Component {

  state ={
    showModal: false
  };

  showModal = () => {
    this.setState({ showModal:true })
  };
  closeModal = () => {
    this.setState({ showModal:!this.state.showModal })
  };

  render() {
    const types = this.props.pokemon.types;
    const pokemon = this.props.pokemon;
    const stats = pokemon.stats;
    return (
      <div className={s.pokemon_block}>
        <img className={s.img} src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} alt={pokemon.name}/>
        <div className={s.name} onClick={this.showModal}>{pokemon.name}</div>
        <div className={s.type_block}>
          <div>Type: </div>
          <div className={s.types_wrap}>
            {
              types.map((item, k) => {
                const type = item.type.name;
                return (
                  <div id={s.pok} className={s[type]} key={k}>{item.type.name}</div>
                )
              })
            }
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <div>
            <img className={s.img_modal} src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} alt={pokemon.name}/>
            <div className={s.pokemon_name}>{pokemon.name}</div>
            <div className={s.pokemon_modal}>
              <div className={s.modal_stats}>
                {
                  stats.map((item, index )=> {
                    return (
                      <div className={s.stats_wrap} key={index}>
                        <div className={s.modal_wrap}>
                          <div className={s.stat_name}>
                            {item.stat.name}:
                          </div>
                          <div className={s.base_stat}>
                            {item.base_stat}
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
