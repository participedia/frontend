import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import sortIcon from "../img/sort.png";

const SortableItem = SortableElement(({text, value, sortIndex}) =>
  <div><img src={sortIcon} alt=""/>&nbsp; {sortIndex + 1} - {(text)}</div>
);

export default SortableItem;
