import React from 'react';

class Snake extends React.Component {

  render() {
    const snake = this.props.points.map((point, key) => {
      return <div
        className="point snake"
        key={key}
        style={{
          top: point.row + '%',
          left: point.col + '%',
        }}></div>
    });
    return (
      <div>{snake}</div>
    );
  }

}

export default Snake;
