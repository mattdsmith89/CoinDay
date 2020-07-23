import React, { Component } from "react";
import { Card } from "reactstrap";
import Deck from "./Deck";
import "./CardScale.css"

export default class ActiveCard extends Component {

  render() {
    if (!this.props.card)
      return null;

    const { value, coins } = this.props.card;
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
            left: 0,
            boxShadow: "inset 0 0 5rem rgba(0,0,0,0.3), 1px 1px 6px black"
          }}>
          <h1 style={{ fontSize: "5rem" }}>{value}</h1>
          <p>{coins} Coin{coins === 1 ? "" : "s"}</p>
        </Card>
      </div>
    );
  }
}
