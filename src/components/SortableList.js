import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} sortIndex={index} index={index} value={value} />
      ))}
    </ul>
  );
});

export default SortableList;
