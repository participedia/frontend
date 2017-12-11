import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import sortIcon from "../img/sort.png";

function unnickify(before) {
  if (!before) return "";
  try {
    return before
      .trim()
      .replace("&amp", "")
      .replace("#039;", "")
      .replace(/[.,\-()&$£;~]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  } catch (e) {
    console.log("exception in nickify, before = ", before);
  }
}

const SortableItem = SortableElement(({value, sortIndex}) =>
  <div><img src={sortIcon} alt=""/>&nbsp; {sortIndex + 1} - {unnickify(value)}</div>
);

export default SortableItem;
