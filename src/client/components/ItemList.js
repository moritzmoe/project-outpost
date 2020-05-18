/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemText
} from '@material-ui/core';

export default function ItemList(props) {
  const { items } = props;
  return (
    <div>
      <List dense>
        {items.map(value => (
          <ListItem>
            <ListItemText
              primary={value.name}
              secondary={value.barcode}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired
};
