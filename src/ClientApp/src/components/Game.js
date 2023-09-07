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

  getGameOverMessage(winners) {
    const { playerId } = this.props;
    const names = winners.map(x => x.id === playerId ? "you" : x.name);
    let winText = "";
    if (names.length > 1) {
      winText = names.slice(0, names.length - 1).join(", ");
      winText += ` and ${names.slice(names.length - 1, names.length)[0]}`
    } else {
      winText = names[0];
    }

    if ((names.length === 1 && names[0] === "you") || names.length > 1) {
      winText += " win!";
    } else {
      winText += " wins!";
    }

    return `Game over, ${winText}`;
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
        {players.map((player, index) => (
          <Badge key={player.id} className={`${index !== 0 ? "ml-2" : ""} p-2`} color={player.ready ? "success" : "dark"}>
            {player.name}
          </Badge>
        ))}
      </div>);

    const winningScore = Math.min(...playAreas.map(x => x.score));
    const winners = playAreas.filter(x => x.score === winningScore).map(x => x.player);
    const gameOverMessage = this.getGameOverMessage(winners);
    const finish = (
      <div>
        <h3 className="mb-4">{gameOverMessage}</h3>
        <table className="table mb-4">
          <thead className="thead-dark">
            <tr>
              <th className="pl-4"></th>
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
      {game.playAreas && game.playAreas.length && game.playOrder && game.playOrder.length
        ? game.playAreas
          .filter(playArea => playArea.player.id !== playerId)
          .sort((a, b) => game.playOrder.indexOf(a.player.id) - game.playOrder.indexOf(b.player.id))
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

    const leaderboard = (<div>{
      game.leaderboard.some(player => player.wins > 0)
        ? (
          <table className="table mt-5">
            <thead>
              <tr>
                <th className="pl-4"></th>
                <th className="text-right pr-4">Wins</th>
              </tr>
            </thead>
            <tbody>
              {game.leaderboard
                .sort((a, b) => (a.wins < b.wins) ? 1 : (a.wins === b.wins) ? ((a.name > b.name) ? 1 : -1) : -1)
                .map((player, index) => (
                  <tr key={player.name}>
                    <td className={`pl-4 ${index === 0 ? "font-weight-bold" : ""}`}>{player.name}</td>
                    <td className={`text-right pr-4 ${index === 0 ? "font-weight-bold" : ""}`}>{player.wins}</td>
                  </tr>
                ))}
            </tbody>
          </table>)
        : null
    }</div>);

    return (
      <div>
        <div>{game.state === "Finished" ? finish : null}</div>
        <div className="pb-3">
          {otherPlayers}
        </div>
        <div>{game.state === "InProgress" ? table : null}</div>
        <div className="my-3">{game.state === "InProgress" ? actions : null}</div>
        <div>
          {game.state !== "InProgress"
            ? (
              <div className="d-flex flex-column mb-4">
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
        <div>
          {myPlayer}
        </div>
        <div>
          {leaderboard}
        </div>
      </div>
    )
  }
}