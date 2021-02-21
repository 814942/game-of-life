import React from "react";
import Box from "./Box";

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    let rowsArr = [];

    let boxClass = "";
    for (let p = 0; p < this.props.rows; p++) {
      for (let x = 0; x < this.props.cols; x++) {
        let boxId = p + "_" + x;

        boxClass = this.props.gridFull[p][x] ? "box on" : "box off";
        rowsArr.push(
          <Box
            key={boxId}
            boxClass={boxClass}
            id={boxId}
            row={p}
            col={x}
            selectBox={this.props.selectBox}
          />
        );
      }
    }

    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
