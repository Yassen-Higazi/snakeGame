import React from 'react';

function Food({ point }) {
  return (
    <div
      className="point food"
      style={{
        top: point.row + '%',
        left: point.col + '%',
      }}></div>
  );
}

export default Food;
