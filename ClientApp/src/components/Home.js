import React, { Component } from 'react';
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Badge,
} from 'reactstrap';
import { Loading } from './Loading';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.handleNotYouClick = this.handleNotYouClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  isInGame(playerId, game) {
    return game.players.some(player => player.id === playerId);
  }

  canCreate(playerId, games) {
    return games != null && !games.some(game => this.isInGame(playerId, game))
  }

  handleNotYouClick() {
    this.props.onClearPlayer();
  }

  handleNewClick() {
    this.props.onCreateGame();
  }

  render() {
    const loading = (<Loading></Loading>);
    const games = this.props.games ? this.props.games : [];
    const gamesList = (
      <Card className="mb-3">
        <ul className="list-group list-group-flush">
          {games.length
            ? games.map(x => (
              <li key={x.id} className="list-group-item">
                {x.players.map(y => (
                  <Badge key={y.id} color={y.id === this.props.playerId ? "success" : "secondary"}>{y.name}</Badge>
                ))}
              </li>))
            : <li className="list-group-item">No games</li>}
        </ul>
      </Card>
    );

    return (
      <div>
        <h1>Home</h1>
        <div className="pb-3">
          <p>
            Hello, {this.props.name}. Welcome to Coin Day!
          </p>
          <Button color="secondary" size="sm" onClick={this.handleNotYouClick}>
            Not {this.props.name}?
          </Button>
        </div>
        <Card>
          <CardBody>
            <CardTitle><h5>Games</h5></CardTitle>
            {this.props.games ? gamesList : loading}
            {this.canCreate(this.props.playerId, this.props.games) ? <Button color="primary" onClick={this.handleNewClick}>New</Button> : null}
          </CardBody>
        </Card>
      </div>
    );
  }

}
