import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import List from '../list/List';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';

const renderFunction = ({ name, username }) => (
  <>
    <strong style={{ color: 'black' }}>{name}</strong> &nbsp;
    <span>@{username}</span>
  </>
);

const UsersList = ({ searchText, loadingMsg = 'Loading...' }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = () => {
    setIsLoading(true);

    fetch(USERS_API)
      .then((response) => response.json())
      .then(setUsers)
      .catch((error) => {
        window.alert('Some error occurred - please check your console');
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <div>{loadingMsg}</div>;
  }

  const usersList =
    searchText === ''
      ? users
      : users.filter(
          ({ name }) =>
            name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );

  return (
    <List
      items={usersList}
      noItemsMsg='None user has been found'
      renderFunction={renderFunction}
      itemId='id'
    />
  );
};

UsersList.propTypes = {
  searchText: PropTypes.string,
  loadingMsg: PropTypes.string,
};

export default UsersList;
