import React from "react";
import { SortableElement } from "react-sortable-hoc";
import sortIcon from "../img/sort.png";

const SortableItem = SortableElement(({ text, value, sortIndex }) => (
  <div>
    <img src={sortIcon} alt="" />&nbsp; {sortIndex + 1} - {text}
  </div>
));

export default SortableItem;
