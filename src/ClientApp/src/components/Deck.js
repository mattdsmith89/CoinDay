import React, { Component } from "react";
import { Card } from "reactstrap";

export default class Deck extends Component {
  static initialDeckSize = 23;
  static cardThickness = 2;
  static cardWidth = "10rem";
  static cardHeight = "14rem";
  static bboxWidth = `calc(${Deck.cardWidth} + ${Deck.cardThickness * Deck.initialDeckSize}px)`;
  static bboxHeight = `calc(${Deck.cardHeight} + ${Deck.cardThickness * Deck.initialDeckSize}px)`;

  generateBoxShadow() {
    const { cardsLeft } = this.props;
    const whiteThickness = Deck.cardThickness * 2 / 3;
    const grayThickness = Deck.cardThickness * 1 / 3;
    let result = "";
    for (let i = 0; i < cardsLeft; i++) {
      const prevThickness = i * Deck.cardThickness;
      const whiteShadow = whiteThickness + prevThickness;
      const grayShadow = whiteShadow + grayThickness;
      result += `${whiteShadow}px ${whiteShadow}px 1px white, `
        + `${grayShadow}px ${grayShadow}px 1px gray, `
    }
    const finalShadowOffset = Deck.cardThickness * cardsLeft + 1;
    result += `inset 0 0 5rem rgba(0,0,0,0.3), ${finalShadowOffset}px ${finalShadowOffset}px 6px rgba(0,0,0,0.6)`;
    return result;
  }

  render() {
    const { cardsLeft } = this.props;
    return (
      <div style={{
        width: Deck.bboxWidth,
        height: `calc(${Deck.cardHeight} + ${Deck.cardThickness * Deck.initialDeckSize}px)`
      }}>
        <Card
          className="d-flex align-items-center justify-content-center"
          style={{
            width: Deck.cardWidth,
            height: Deck.cardHeight,
            position: "relative",
            background: "#f7f3fd",
            top: (Deck.initialDeckSize - cardsLeft) * Deck.cardThickness,
            left: (Deck.initialDeckSize - cardsLeft) * Deck.cardThickness,
            boxShadow: this.generateBoxShadow()
          }}>
          <h1 className="text-muted">{cardsLeft}</h1>
          <span className="text-muted">remaining</span>
        </Card>
      </div>
    );
  }
}