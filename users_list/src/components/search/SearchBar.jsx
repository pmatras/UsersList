import React from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

const SearchBar = ({ value, onQueryChange, placeholder = 'Search...' }) => {
  return (
    <div>
      <input
        type='search'
        className='search-bar'
        placeholder={placeholder}
        value={value}
        onChange={onQueryChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
