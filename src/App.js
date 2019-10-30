import React from 'react';
import Snake from './components/snake';
import Food from './components/food';

import './App.css';

class SnakeGame extends React.Component {

  speedRate = 10

  state = {
    cols: 50,
    rows: 50,
    speed: 120,
    direction: 'RIGHT',
    food: {col: 10, row: 10},
    snake: [{col: 0, row: 0}, {col: 2, row: 0}],
  }

  componentDidUpdate() {
    this.checkIfAteFood();
    this.checkIfCollapse();
    this.checkIfOutofBorders();
  }

  componentDidMount() {
    this.container = document.getElementById('container');
    this.setState({food: this.getRandomPoint()});
    document.onkeydown = this.onkeydown;
    this.interval = setInterval(this.moveSnake, this.state.speed);
  }

  moveSnake = () => {
    const {snake: points, direction} = this.state;
    const head = points[points.length - 1];
    let newHead, newPoints = [...points];

    switch (direction) {
      case 'UP':
        newHead = {...head, row: head.row - 2};
        break;
    
      case 'RIGHT':
        newHead = {...head, col: head.col + 2};
        break;
    
      case 'LEFT':
        newHead = {...head, col: head.col - 2};
        break;
    
      case 'DOWN':
        newHead = {...head, row: head.row + 2};
        break;
    
      default:
        newHead = {...head, col: head.col + 2};
        break;
    }

    
    newPoints.push(newHead);
    newPoints.shift();
    this.setState({snake: newPoints});
  }

  checkIfOutofBorders() {
    const head = this.state.snake[this.state.snake.length - 1];
    if (head.col > 98 || head.col < 0 || head.row < 0 || head.row > 98) this.gameOver();
  }

  checkIfAteFood() {
    const head = this.state.snake[this.state.snake.length - 1];
    const food = this.state.food;
    if (head.col === food.col && food.row === head.row) {
      this.enlargenSnake(food)
      this.speedup();
    };
  }
  
  checkIfCollapse() {
    const snake = [...this.state.snake];
    const head = snake.pop();
    snake.forEach((point) => {
      if (head.row === point.row && head.col === point.col) this.gameOver();
    });
  }

  onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        this.setState({'direction': 'LEFT'});
        break;
      
      case 38:
        this.setState({'direction': 'UP'});
        break;
    
      case 39:
        this.setState({'direction': 'RIGHT'});
        break;
      
      case 40:
        this.setState({'direction': 'DOWN'});
        break;
    
      default:
        this.setState({'direction': 'RIGHT'});
        break;
    }
  }

  gameOver() {
    const end = window.confirm('Game Over. wanna try again??');
    if (!end) {
      this.reset();
      return clearInterval(this.interval);
    } else {
      this.reset();
    }
  }

  reset() {
    this.setState({
      speed: 700,
      direction: 'RIGHT',
      snake: [{col: 0, row: 0}, {col: 2, row: 0}],
    });
  }

  speedup() {
    if (this.state.speed >= 10) {
      this.setState({speed: this.state.speed - this.speedRate});
    }
  }

  enlargenSnake() {
    const newSnake = [...this.state.snake];
    newSnake.unshift({});
    this.setState({
      snake: newSnake,
      food: this.getRandomPoint(),
    });
  }

  getRandomPoint() {
    const min = 1;
    const max = 50;
    return {
      col: Math.floor(Math.random() * (max - min + 1) + min / 2) * 2,
      row: Math.floor(Math.random() * (max - min + 1) + min / 2) * 2,
    }
  }

  render() {
    return (
      <div id="container" className="snake-container">
        <Food point={this.state.food} />
        <Snake points={this.state.snake}/>
      </div>
    );
  }

}

export default SnakeGame;
