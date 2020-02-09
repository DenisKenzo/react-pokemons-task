import React from "react";
import { Select } from 'react-materialize'

export default class Selector extends React.Component{

  render() {
    const changeOption = this.props.changeOption;
    const limitOption = this.props.limitOption.toString();
    return (
      <Select value={limitOption} onChange={changeOption} label="Choose your option">
        <option disabled value=''>Choose your option</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </Select>
    )
  }
}
