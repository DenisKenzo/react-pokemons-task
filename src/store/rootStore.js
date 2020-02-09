import { createContext } from 'react';
import { Store } from './store';

export class RootStore {
  constructor() {
    this.store = new Store(this);
  }
}

export default createContext(new RootStore());
