import React from "react";

const Filter = ({ filterValue, hendleFilter }) => {
  return (
    <>
      <h3>Find contacts by name</h3>
      <input value={filterValue} onChange={hendleFilter} />
    </>
  );
};

export default Filter;
