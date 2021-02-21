import React from "react";
import Grid from "./Grid";
import Button from "./Button";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let p = 0; p < this.rows; p++) {
      for (let x = 0; x < this.cols; x++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[p][x] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  fast = () => {
    this.speed = 10;
    this.playButton();
  };
  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  clear = () => {
    let grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
    });
  };

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
        break;
    }
    this.clear();
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let p = 0; p < this.rows; p++) {
      for (let x = 0; x < this.cols; x++) {
        let count = 0;
        if (p > 0) if (g[p - 1][x]) count++;
        if (p > 0 && x > 0) if (g[p - 1][x - 1]) count++;
        if (p > 0 && x < this.cols - 1) if (g[p - 1][x + 1]) count++;
        if (x < this.cols - 1) if (g[p][x + 1]) count++;
        if (x > 0) if (g[p][x - 1]) count++;
        if (p < this.rows - 1) if (g[p + 1][x]) count++;
        if (p < this.rows - 1 && x > 0) if (g[p + 1][x - 1]) count++;
        if (p < this.rows - 1 && this.cols - 1) if (g[p + 1][x + 1]) count++;
        if (g[p][x] && (count < 2 || count > 3)) g2[p][x] = false;
        if (!g[p][x] && count === 3) g2[p][x] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Button
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generation: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default Main;
