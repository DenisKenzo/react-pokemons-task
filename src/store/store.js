import { decorate, observable } from 'mobx';
import axios from '../axios/axios';
import { toJS } from 'mobx';

class Store {

  state = 'ok';
  filter = '';
  pagination = {
    thisPage: 1,
    allPage: 1,
    limit: 10,
    offset: 0,
  };
  activeTags = false;
  id = null;
  pokemonData = [];

  tagsList = [
    { type: 'normal', checked: false },
    { type: 'fighting', checked: false },
    { type: 'flying', checked: false },
    { type: 'poison', checked: false },
    { type: 'ground', checked: false },
    { type: 'rock', checked: false },
    { type: 'bug', checked: false },
    { type: 'ghost', checked: false },
    { type: 'steel', checked: false },
    { type: 'fire', checked: false },
    { type: 'water', checked: false },
    { type: 'grass', checked: false },
    { type: 'electric', checked: false },
    { type: 'psychic', checked: false },
    { type: 'ice', checked: false },
    { type: 'dragon', checked: false },
    { type: 'dark', checked: false },
    { type: 'fairy', checked: false },
    { type: 'shadow', checked: false }
  ];

  listTypesActive = [];


  handleTags = type => {
    this.listTypesActive.includes(type)
      ? this.listTypesActive = this.listTypesActive.filter(item => item !== type)
      : this.listTypesActive.push(type);
    if (!this.listTypesActive.length && this.activeTags) {
      this.activeTags = false;
      this.resetPagination();
      this.pokemonList();
    }
  };

  handleNavigate = e => {
    if (this.pagination.thisPage === e) {
      return;
    }
    this.pagination.thisPage = +e;
    this.pagination.offset = (this.pagination.limit * this.pagination.thisPage)
      - this.pagination.limit;
    this.pokemonList();
  };

  handleLimit = event => {
    this.pagination.limit = +event.target.value;
    this.pagination.offset = 0;
    this.pagination.thisPage = 1;
    if (!(this.pokemonData.length < 9) && this.pagination.thisPage === 1) {
      this.pokemonList();
    }
  };

  handleSearch = value => {
    if (this.filter !== value) {
      this.filter = value;
      this.resetPagination();
      this.pokemonList();
    }
  };

  pokemonList = async () => {
    this.state = 'pending';
    this.pokemonData = [];
    this.pagination.allPage = 1;
    const { offset } = this.pagination;
    const limit = this.pagination.offset + this.pagination.limit;
    if (this.id) {
      this.favoriteData = this.favoriteData.length ? this.favoriteData : await this.getFavoriteData(this.id);
    }
    try {
      if (this.listTypesActive.length) {
        let pokType = [];
        for (const type of this.listTypesActive) {
          const response = await axios.get(`type/${type}`);
          pokType.push(...response.data.pokemon.map(i => i.pokemon));
        }
        if (this.filter !== '') {
          pokType = pokType.filter(i => i.name.toLowerCase().includes(this.filter));
        }
        this.pagination.allPage = Math.ceil(pokType.length / this.pagination.limit);
        for (const item of pokType.slice(offset, limit)) {
          this.pokemonData.push(await this.pokemonItemLoad(item.name))
        }
      } else if (this.filter !== '') {
        await this.pokemonFilterList(offset, limit);
      } else {
        const response = await axios.get('pokemon/', {
          params: { limit: this.pagination.limit, offset: this.pagination.offset },
        });
        if (response.data.results) {
          this.pagination.allPage = Math.ceil(response.data.count / this.pagination.limit);
          for (const item of response.data.results) {
            this.pokemonData.push(await this.pokemonItemLoad(item.name))
          }
        }
      }
      this.state = this.pokemonData.length ? 'ok' : 'null';
    } catch (error) {
      this.state = 'error';
    }
  };

  pokemonFilterList = async (offset, limit) => {
    const response = await axios.get('pokemon/', { params: { limit: 900 } });
    if (response.data.results) {
      const pokTemp = response.data.results.filter(i => i.name.toLowerCase().includes(this.filter));
      this.pagination.allPage = Math.ceil(pokTemp.length / this.pagination.limit);
      for (const i of pokTemp.slice(offset, limit)) {
        this.pokemonData.push(await this.pokemonItemLoad(i.name));
      }
    }
  };

  pokemonItemLoad = async item => {
    try {
      const response = await axios.get(`pokemon/${item}`);
      if (response.data) {
        return toJS(response.data);
      }
    } catch (error) {
      this.state = 'error';
    }
  };

  resetPagination = () => {
    this.pagination.thisPage = 1;
    this.pagination.offset = 0;
  };
}

decorate(Store, {
  pagination: observable,
  pokemonData: observable,
  listTypesActive: observable,
  state: observable,
});

export { Store };
