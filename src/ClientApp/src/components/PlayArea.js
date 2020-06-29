import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

export default class PlayArea extends Component {
  render() {
    const { playArea } = this.props;
    const { player, coins, cards } = playArea;
    return (
      <div className="mb-2">
        <Card>
          <CardHeader>{player.name}<span className="float-right">{coins} Coin{coins === 1 ? "" : "s"}</span></CardHeader>
          <CardBody>
            {cards.map(c => <Card key={c.value}>{c.value}</Card>)}
          </CardBody>
        </Card>
      </div>
    );
  }
}