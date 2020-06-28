import React, { Component } from "react";
import { Card } from "reactstrap";
import Deck from "./Deck";
import "./ActiveCard.css"

export default class ActiveCard extends Component {

  render() {
    const { value } = this.props;
    let classNames = "d-flex align-items-center justify-content-center";
    classNames += ` card-${value}`;
    return (
      <div style={{
        width: Deck.bboxWidth,
        height: Deck.bboxHeight
      }}>
        <Card
          className={classNames}
          style={{
            width: Deck.cardWidth,
            height: Deck.cardHeight,
            position: "relative",
            color: "white",
            top: Deck.initialDeckSize * Deck.cardThickness,
            left: 0
          }}>
          <h1 style={{ fontSize: "5rem" }}>{value}</h1>
        </Card>
      </div>
    );
  }
}
