import React from "react";
import "./List.css";

function List(props) {
  return (
    <div className="list">
      {props.items.map((obj, index) => <div>{obj.text}</div>)}
    </div>
  );
}

export default List;
