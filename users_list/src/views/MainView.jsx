import React, { useState } from 'react';

import SearchBar from '../components/search/SearchBar';
import UsersList from '../components/users_list/UsersList';

import './MainView.css';

const MainView = () => {
  const [queryText, setQueryText] = useState('');

  return (
    <div className='main-container'>
      <h1>Users List</h1>
      <SearchBar
        value={queryText}
        onQueryChange={({ target: { value } }) => setQueryText(value)}
        placeholder='Search by user name...'
      />
      <UsersList searchText={queryText} loadingMsg='Loading...' />
    </div>
  );
};

export default MainView;
