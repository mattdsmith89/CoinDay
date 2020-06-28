import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Badge,
} from 'reactstrap';
import Loading from './Loading';

class Games extends Component {
  constructor(props) {
    super(props);

    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.goToPlay = this.goToPlay.bind(this);
  }

  isInGame(playerId, game) {
    return game.players.some(player => player.id === playerId);
  }

  canCreate(playerId, games) {
    return games != null && !games.some(game => this.isInGame(playerId, game))
  }

  handleNewClick() {
    this.props.onCreateGame();
  }

  handleJoinClick(gameId) {
    this.joinGame(gameId);
  }

  get canJoin() {
    const games = this.props.games ? this.props.games : [];
    return !games.some(game => this.isInGame(this.props.playerId, game));
  }

  canPlay(game) {
    return this.isInGame(this.props.playerId, game);
  }

  async joinGame(gameId) {
    const playerId = this.props.playerId;
    const response = await fetch(`game/${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: playerId }),
    });
    this.props.onJoin(await response.json());
  }

  goToPlay() {
    const { history } = this.props;
    history.push("/play");
  }

  render() {
    const loading = (<Loading></Loading>);
    const games = this.props.games ? this.props.games : [];
    const gamesList = (
      <Card className="mb-3">
        <ul className="list-group list-group-flush">
          {games.length
            ? games.map(x => (
              <li key={x.id} className="list-group-item d-flex" style={{ minHeight: "3.5em" }}>
                <div className="flex-fill d-flex align-items-center flex-wrap">
                  {x.players.map(y => (
                    <Badge
                      key={y.id}
                      className="mr-2 my-1"
                      color={y.id === this.props.playerId ? "success" : "secondary"}>
                      {y.name}
                    </Badge>
                  ))}
                </div>
                <div className="float-right">
                  {this.canJoin ? <Button onClick={() => this.handleJoinClick(x.id)} size="sm">Join</Button> : null}
                  {this.canPlay(x) ? <Button onClick={this.goToPlay} size="sm">Play</Button> : null}
                </div>
              </li>))
            : <li className="list-group-item pt-3" style={{ height: "3.5em" }}>No games</li>}
        </ul>
      </Card>
    );

    return (
      <Card>
        <CardBody>
          <CardTitle><h5>Games</h5></CardTitle>
          {this.props.games ? gamesList : loading}
          {this.canCreate(this.props.playerId, this.props.games)
            ? <Button color="primary" onClick={this.handleNewClick}>New</Button>
            : null}
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(Games);