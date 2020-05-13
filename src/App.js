import React from 'react';
import Snake from './components/snake';
import Food from './components/food';

import './App.css';

class SnakeGame extends React.Component {
  cols = 50;
  rows = 50;
  boxSize = 2;
  maxSpeed = 15;
  speedRate = 10;

  state = {
    speed: 120,
    direction: 'RIGHT',
    food: { col: 10, row: 10 },
    snake: [
      { col: 0, row: 0 },
      { col: 2, row: 0 },
    ],
  };

  componentDidUpdate() {
    this.checkIfAteFood();
    this.checkIfCollapsed();
    this.checkIfOutOfBorders();
  }

  componentDidMount() {
    this.setState({ food: this.getRandomPoint() });
    document.onkeydown = this.onkeydown;
    this.loop();
  }

  loop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(
      requestAnimationFrame,
      this.state.speed,
      this.moveSnake,
    );
  }

  moveSnake = () => {
    const { snake: points, direction } = this.state;
    const head = points[points.length - 1];
    let newHead,
      newPoints = [...points];

    switch (direction) {
      case 'UP':
        newHead = { ...head, row: head.row - this.boxSize };
        break;

      case 'RIGHT':
        newHead = { ...head, col: head.col + this.boxSize };
        break;

      case 'LEFT':
        newHead = { ...head, col: head.col - this.boxSize };
        break;

      case 'DOWN':
        newHead = { ...head, row: head.row + this.boxSize };
        break;

      default:
        newHead = { ...head, col: head.col + this.boxSize };
        break;
    }

    newPoints.push(newHead);
    newPoints.shift();
    this.setState({ snake: newPoints });
  };

  checkIfOutOfBorders() {
    const head = this.state.snake[this.state.snake.length - 1];
    if (head.col > 98 || head.col < 0 || head.row < 0 || head.row > 98)
      this.gameOver();
  }

  checkIfAteFood() {
    const head = this.state.snake[this.state.snake.length - 1];
    const food = this.state.food;
    if (head.col === food.col && food.row === head.row) {
      this.enlargenSnake();
      this.speedup();
    }
  }

  checkIfCollapsed() {
    const snake = [...this.state.snake];
    const head = snake.pop();
    snake.forEach((point) => {
      if (head.row === point.row && head.col === point.col) this.gameOver();
    });
  }

  onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: 'LEFT' });
        break;

      case 38:
        this.setState({ direction: 'UP' });
        break;

      case 39:
        this.setState({ direction: 'RIGHT' });
        break;

      case 40:
        this.setState({ direction: 'DOWN' });
        break;

      default:
        this.setState({ direction: 'RIGHT' });
        break;
    }
  };

  gameOver() {
    const end = window.confirm('Game Over. wanna try again??');
    if (!end) {
      this.reset(false);
      return clearInterval(this.interval);
    } else {
      this.reset();
    }
  }

  reset(loop = true) {
    this.setState(
      {
        speed: 120,
        direction: 'RIGHT',
        snake: [
          { col: 0, row: 0 },
          { col: 2, row: 0 },
        ],
        food: this.getRandomPoint(),
      },
      () => loop && this.loop(),
    );
  }

  speedup() {
    if (this.state.speed >= this.maxSpeed) {
      this.setState({ speed: this.state.speed - this.speedRate });
    }
  }

  enlargenSnake() {
    const newSnake = [...this.state.snake];
    newSnake.unshift({});
    this.setState(
      {
        snake: newSnake,
        food: this.getRandomPoint(),
      },
      () => this.loop(),
    );
  }

  getRandomPoint() {
    const min = 1;
    const maxCols = this.cols;
    const maxRows = this.rows;
    return {
      col: Math.floor(Math.random() * (maxCols - min + 1) + min / 2) * 2,
      row: Math.floor(Math.random() * (maxRows - min + 1) + min / 2) * 2,
    };
  }

  render() {
    return (
      <div className="snake-container">
        <Food point={this.state.food} />
        <Snake points={this.state.snake} />
      </div>
    );
  }
}

export default SnakeGame;
