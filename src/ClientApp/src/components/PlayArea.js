import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import "./CardScale.css"

export default class PlayArea extends Component {

  getGroupingOffset(array, index) {
    if (index === 0) {
      return 0;
    }

    const { value } = array[index];
    const prevValue = array[index - 1].value;
    const offset = prevValue + 1 < value ? 0 : -20;
    return offset + this.getGroupingOffset(array, index - 1);
  }

  getCoinDisplay(showValue, coins) {
    if (showValue) {
      return `${coins} Coin${coins === 1 ? "" : "s"}`;
    }

    if (coins < 5) {
      return "Few coins";
    }

    if (coins < 14) {
      return "Many coins";
    }

    if (coins < 20) {
      return "Loadsa coins";
    }

    return "Fort Knox!!";
  }

  render() {
    const { playArea, highlight } = this.props;
    const { player, coins, cards } = playArea;
    const coinDisplay = this.getCoinDisplay(highlight, coins);
    return (
      <div className="mb-2">
        <Card style={highlight ? {background: "#ffe8db"} : null}>
          <CardHeader className="px-2 py-1">{player.name}<span className="float-right">{coinDisplay}</span></CardHeader>
          <CardBody className="d-flex overflow-auto p-2" style={{minHeight: "4.5rem"}}>
            {cards
              .sort((a, b) => a.value - b.value)
              .map((c, i, array) => {
                const notGrouped = i === 0 || array[i - 1].value + 1 < c.value;
                let classNames = "d-flex justify-content-center mr-1";
                if (!notGrouped)
                  classNames += " align-items-end";
                else
                  classNames += " align-items-center";
                classNames += ` card-${c.value}`;
                return (
                  <Card
                    key={c.value}
                    className={classNames}
                    style={{
                      color: "white",
                      minWidth: "2.5rem",
                      height: "3.5rem",
                      boxShadow: "inset 0 0 2rem rgba(0,0,0,0.3), 1px 1px 2px rgba(0,0,0,0.3)",
                      position: "relative",
                      paddingRight: notGrouped
                        ? 0
                        : c.value > 9
                          ? "2px"
                          : "7px",
                      left: this.getGroupingOffset(array, i),
                      zIndex: 100 - c.value,
                    }}>
                    <span style={{ fontSize: notGrouped ? "1.5rem" : null }}>{c.value}</span>
                  </Card>);
              })}
          </CardBody>
        </Card>
      </div>
    );
  }
}