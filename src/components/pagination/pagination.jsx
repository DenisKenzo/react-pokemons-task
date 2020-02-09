import React from "react";
import {Pagination} from 'react-materialize'

export default class PaginationList extends React.Component {
  render() {
    const pagination = this.props.pagination;
    const handleNavigate = this.props.handleNavigate;
    return (
      <div>
        <Pagination
          onSelect={handleNavigate}
          maxButtons={5}
          items={pagination.allPage || 1}
          activePage={pagination.thisPage || 1}
        />
      </div>
    )
  }
}
