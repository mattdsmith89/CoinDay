import React, { Component } from "react";
import { Button, Badge } from "reactstrap";
import Deck from "./Deck";
import ActiveCard from "./ActiveCard";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
  }

  handleStart() {
    this.startGame();
  }

  async startGame() {
    const { game, playerId } = this.props;
    await fetch(`game/${game.id}/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "StartGame", playerId }),
    });
  }

  render() {
    const { game, playerId } = this.props;
    const table = (
      <div className="pt-3 d-flex justify-content-center">
        <ActiveCard value={game.currentCard ? game.currentCard.value : null}></ActiveCard>
        <Deck cardsLeft={game.cardsLeft}></Deck>
      </div>);
    const actions = (
      <div className="pt-3 d-flex justify-content-center">
        {game.currentPlayer ? <p>Waiting for {game.currentPlayer.name}</p> : null}
      </div>);

    return (
      <div>
        <h5>Players</h5>
        <p></p>
        <div className="pb-3">
          {game.players.map(x => (
            <Badge
              key={x.id}
              color={x.id === playerId ? "success" : "secondary"}
              className="mr-1"
            >{x.name}</Badge>
          ))}
        </div>
        {!game.started
          ? <Button onClick={this.handleStart} disabled={game.players.length < 3}>Start</Button>
          : null}
        {game.started ? table : null}
        {game.started ? actions : null}
      </div>
    )
  }
}