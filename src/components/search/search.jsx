import React from "react";
import { TextInput } from 'react-materialize'
import s from './search.module.scss'

export default class Search extends React.Component {

  inputValue = e => {
    const value = e.target.value;
    this.props.handleSearch(value)

  };


  render() {
    return (
      <div className={s.search}>
        <TextInput
          label='Type a pokemon name'
          onChange={this.inputValue}
          error="Specify only letters"
        />
      </div>
    )
  }

}
