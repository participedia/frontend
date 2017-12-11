import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import "./SortableList.css";

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="sortable-list">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} sortIndex={index} index={index} value={value} />
      ))}
    </div>
  );
});

export default SortableList;
