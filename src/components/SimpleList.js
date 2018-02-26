import React from "react";
import "./SimpleList.css";

function SimpleList(props) {
  return (
    <div className="simple-list">
      {props.items.map((obj, index) => <div>{obj.text}</div>)}
    </div>
  );
}

export default SimpleList;
