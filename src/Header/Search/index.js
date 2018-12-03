import React from 'react'
import './index.css'
import { Link } from 'react-router-dom';

export default ({
  changeHandler,
  fetchForSearch,
  searchValue,
}) => (
  <div className="searchPanel">
    <input 
      onChange={changeHandler('searchValue')}
      value={searchValue}
    />
    <Link to="/">
      <button
        disabled={
          (searchValue == '' || searchValue.match(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/)) ?
          false :
          true
        }
        onClick={() => fetchForSearch(0)}
      >
        Search
      </button>
    </Link>
  </div>
)

