import React, { Component } from "react";
import { Button, Badge, ButtonGroup } from "reactstrap";
import Deck from "./Deck";
import ActiveCard from "./ActiveCard";
import PlayArea from "./PlayArea";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleTake = this.handleTake.bind(this);
  }

  handleStart() {
    this.postAction("ReadyUp");
  }

  handleAdd() {
    this.postAction("AddCoin");
  }

  handleTake() {
    this.postAction("TakeCard");
  }

  async postAction(action) {
    const { game, playerId } = this.props;
    await fetch(`game/${game.id}/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, playerId }),
    });
  }

  get currentActions() {
    const { game, playerId } = this.props;
    const { currentPlayer, playAreas } = game;
    if (!currentPlayer)
      return null;

    if (currentPlayer.id !== playerId)
      return <p className="mb-0">Waiting for {game.currentPlayer.name}</p>;

    const hasCoins = playAreas.find(x => x.player.id === playerId).coins > 0;

    return (
      <ButtonGroup>
        <Button size="lg" disabled={!hasCoins} onClick={this.handleAdd}>Place Coin</Button>
        <Button size="lg" onClick={this.handleTake}>Take Card</Button>
      </ButtonGroup>
    )
  }

  render() {
    const { game, playerId } = this.props;
    const { players, playAreas } = game;
    const thisPlayer = players.find(player => player.id === playerId);

    const table = (
      <div className="pt-3 d-flex justify-content-center">
        <ActiveCard card={game.currentCard}></ActiveCard>
        <Deck cardsLeft={game.cardsLeft}></Deck>
      </div>);

    const actions = (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "4rem" }}>
        {this.currentActions}
      </div>);

    const playerList = (
      <div>
        {players.map(player => (
          <Badge key={player.id} className="mr-2 p-2" color={player.ready ? "success" : "dark"}>
            {player.name}
          </Badge>
        ))}
      </div>);

    const winningPlayer = playAreas.reduce((min, playArea) => min && min.score < playArea.score ? min : playArea, null);
    const finish = (
      <div>
        <h3 className="mb-4">Game over, {
          winningPlayer
            ? (winningPlayer.player.id === playerId ? "you win!" : `${winningPlayer.player.name} wins!`)
            : null
        }</h3>
        <table className="table mb-5">
          <thead className="thead-dark">
            <tr>
              <th className="pl-4">Player</th>
              <th className="text-right pr-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {playAreas.sort((a, b) => a.score - b.score).map((playArea, index) => (
              <tr key={playArea.player.id}>
                <td className={`pl-4 ${index === 0 ? "font-weight-bold" : ""}`}>{playArea.player.name}</td>
                <td className={`text-right pr-4 ${index === 0 ? "font-weight-bold" : ""}`}>{playArea.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

    const otherPlayers = (<div>
      {game.playAreas && game.playAreas.length
        ? game.playAreas
          .filter(playArea => playArea.player.id !== playerId)
          .sort((a, b) => (a.player.name > b.player.name) ? 1 : -1)
          .map(playArea => (
            <PlayArea className="mb-2" playArea={playArea} key={playArea.player.id}></PlayArea>
          ))
        : null}
    </div>);

    const myPlayer = (<div>
      {game.playAreas && game.playAreas.length
        ? <PlayArea highlight={true} playArea={game.playAreas.find(playArea => playArea.player.id === playerId)} />
        : null}
    </div>);

    return (
      <div>
        <div className="pb-3">
          {otherPlayers}
        </div>
        <div>{game.state === "InProgress" ? table : null}</div>
        <div className="my-3">{game.state === "InProgress" ? actions : null}</div>
        <div>{game.state === "Finished" ? finish : null}</div>
        <div>
          {myPlayer}
        </div>
        <div>
          {game.state !== "InProgress"
            ? (
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-center mb-2">
                  {playerList}
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={this.handleStart}
                    disabled={game.players.length < 3}
                    color={thisPlayer.ready ? "success" : "secondary"}>Ready!</Button>
                </div>
              </div>)
            : null}
        </div>
      </div>
    )
  }
}