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
        data-testid='search-bar'
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
