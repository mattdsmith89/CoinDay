import React, { Component } from "react";
import { Button, Badge, ButtonGroup } from "reactstrap";
import Deck from "./Deck";
import ActiveCard from "./ActiveCard";
import PlayArea from "./PlayArea";

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

  get currentActions() {
    const { game, playerId } = this.props;
    const { currentPlayer } = game;
    if (currentPlayer.id !== playerId)
      return <p>Waiting for {game.currentPlayer.name}</p>;

    return (
      <ButtonGroup>
        <Button size="lg">Place Coin</Button>
        <Button size="lg">Take Card</Button>
      </ButtonGroup>
    )
  }

  render() {
    const { game, playerId } = this.props;
    const { players } = game;
    const table = (
      <div className="pt-3 d-flex justify-content-center">
        <ActiveCard value={game.currentCard ? game.currentCard.value : null}></ActiveCard>
        <Deck cardsLeft={game.cardsLeft}></Deck>
      </div>);
    const actions = (
      <div className="pt-3 d-flex justify-content-center">
        {this.currentActions}
      </div>);
    const playerList = (
      <div>
        <span>Players: </span>
        {players.map(player => (
          <Badge key={player.id} className="mr-2" color={player.id === playerId ? "success" : "secondary"}>
            {player.name}
          </Badge>
        ))}
      </div>);

    return (
      <div>
        <div className="pb-3">
          {game.playAreas && game.playAreas.length ? game.playAreas.map(playArea => (
            <PlayArea className="mb-2" playArea={playArea} key={playArea.player.id}></PlayArea>
          )) : playerList}
        </div>
        <div>
          {!game.started
            ? <Button onClick={this.handleStart} disabled={game.players.length < 3}>Start</Button>
            : null}
        </div>
        <div>{game.started ? table : null}</div>
        <div className="my-3">{game.started ? actions : null}</div>
      </div>
    )
  }
}