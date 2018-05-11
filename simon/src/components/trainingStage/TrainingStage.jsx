import React, { Component } from "react";

// Components
import Square from "../square/SquareContainer.js";
import Circle from "../circle/CircleContainer.js";

// Styled Components
import TrainingStageComp from "./TrainingStage.js";
import Button from "../general/Button.js";
import TableComp from "../table/Table.js";
import TableBodyComp from "../table/TableBody.js";
import TrComp from "../table/Tr.js";
import TdComp from "../table/Td.js";

class TrainingStage extends Component {
  state = {
    shapes: [],
    numberOfShapes: 12
  };
  componentWillMount() {
    let i = 0;
    for (i = 0; i < this.state.numberOfShapes; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        this.state.shapes.push(
          <Square
            active={false}
            key={this.generateID()}
            color={
              this.props.theme.baseColors[
                Object.keys(this.props.theme.baseColors)[
                  Math.floor(Math.random() * 6)
                ]
              ]
            }
            size={
              this.props.theme.sizes[
                Object.keys(this.props.theme.sizes)[
                  Math.floor(Math.random() * 4)
                ]
              ]
            }
            margin={
              this.props.theme.margin[
                Object.keys(this.props.theme.margin)[
                  Math.floor(Math.random() * 3)
                ]
              ]
            }
          />
        );
      } else {
        this.state.shapes.push(
          <Circle
            active={false}
            key={this.generateID()}
            color={
              this.props.theme.baseColors[
                Object.keys(this.props.theme.baseColors)[
                  Math.floor(Math.random() * 6)
                ]
              ]
            }
            size={
              this.props.theme.sizes[
                Object.keys(this.props.theme.sizes)[
                  Math.floor(Math.random() * 4)
                ]
              ]
            }
            margin={
              this.props.theme.margin[
                Object.keys(this.props.theme.margin)[
                  Math.floor(Math.random() * 3)
                ]
              ]
            }
          />
        );
      }
    }
  }

  generateID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
  render() {
    if (this.props.userId) {
      return (
        <TrainingStageComp>
          <TableComp>
            <TableBodyComp>
              <TrComp>
                {this.state.shapes
                  .slice(0, 4)
                  .map((shape, key) => <TdComp key={key}>{shape}</TdComp>)}
              </TrComp>
              <TrComp>
                {this.state.shapes
                  .slice(4, 8)
                  .map((shape, key) => <TdComp key={key}>{shape}</TdComp>)}
              </TrComp>
              <TrComp>
                {this.state.shapes
                  .slice(8, 12)
                  .map((shape, key) => <TdComp key={key}>{shape}</TdComp>)}
              </TrComp>
            </TableBodyComp>
          </TableComp>
          <Button onClick={this.props.onStartTraining}>Train!</Button>
        </TrainingStageComp>
      );
    } else return null;
  }
}

export default TrainingStage;
