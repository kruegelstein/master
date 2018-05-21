import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../table/Table.js";
import TableBodyComp from "../table/TableBody.js";
import TrComp from "../table/Tr.js";
import TdComp from "../table/Td.js";

class UserInputStage extends Component {
  render() {
    if (this.props.userInput) {
      return (
        <TrainingStageComp>
          <TableComp>
            <TableBodyComp>
              <TrComp>
                {this.props.elements.slice(0, 4).map((element, key) => {
                  return (
                    <TdComp
                      key={key}
                      onClick={() => this.props.onSelectElement(element.key)}
                    >
                      {element}
                    </TdComp>
                  );
                })}
              </TrComp>
              <TrComp>
                {this.props.elements.slice(4, 8).map((element, key) => {
                  return (
                    <TdComp
                      key={key}
                      onClick={() => this.props.onSelectElement(element.key)}
                    >
                      {element}
                    </TdComp>
                  );
                })}
              </TrComp>
              <TrComp>
                {this.props.elements.slice(8, 12).map((element, key) => {
                  return (
                    <TdComp
                      key={key}
                      onClick={() => this.props.onSelectElement(element.key)}
                    >
                      {element}
                    </TdComp>
                  );
                })}
              </TrComp>
            </TableBodyComp>
          </TableComp>
        </TrainingStageComp>
      );
    } else return null;
  }
}

export default UserInputStage;
