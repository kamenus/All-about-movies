import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './index.css';

import Search from './Search';
import Filter from './Filter';

export default ({
  changeHandler,
  searchValue,
  fetchForSearch,
  resetFilter,
  isComponent,
  yearToFilter,
  yearFilter,
}) => (
  <div className="header">
    <Link to="/">
      <img 
        onClick={resetFilter}
        src={logo} 
        alt="logo"
        className="logoImg"
      />
    </Link>   
    <Search 
      changeHandler={changeHandler}
      searchValue={searchValue}
      fetchForSearch={fetchForSearch}
    />
    <Filter 
      changeHandler={changeHandler}
      yearToFilter={yearToFilter}
      yearFilter={yearFilter}
    />
  </div>
)