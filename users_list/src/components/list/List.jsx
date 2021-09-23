import React from 'react';
import PropTypes from 'prop-types';

import './List.css';

const List = ({
  items,
  noItemsMsg = 'No elements',
  renderFunction,
  itemId = 'id',
}) => {
  return items?.length ? (
    <div>
      <ol>
        {items.map((item) => (
          <li key={item[itemId]}>{renderFunction(item)}</li>
        ))}
      </ol>
    </div>
  ) : (
    <div>{noItemsMsg}</div>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  noItemsMsg: PropTypes.string,
  renderFunction: PropTypes.func.isRequired,
  itemId: PropTypes.string,
};

export default List;
