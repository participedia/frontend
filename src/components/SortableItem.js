import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value, sortIndex}) =>
  <li>{value}-p{sortIndex + 1}</li>
);

export default SortableItem;
