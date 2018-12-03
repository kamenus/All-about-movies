import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  changeHandler,
  yearToFilter,
  yearFilter,
}) => (
  <div>
    <input 
      onChange={changeHandler("yearToFilter")}
      value={yearToFilter}
    />
    <Link to="/">
      <button
        disabled={
          (yearToFilter == '' || yearToFilter.match(/^\d+$/)) ?
          false :
          true
        }
        onClick={() => yearFilter(yearToFilter)}
      >
        Filter
      </button>
    </Link>
  </div>
)