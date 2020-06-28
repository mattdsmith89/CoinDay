import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Games } from './Games';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.handleNotYouClick = this.handleNotYouClick.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleNotYouClick() {
    this.props.onClearPlayer();
  }

  handleCreateGame() {
    this.props.onCreateGame();
  }

  handleJoin(game) {
    this.props.onJoinGame(game);
  }

  render() {
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
        <Games
          games={this.props.games}
          playerId={this.props.playerId}
          onCreateGame={this.handleCreateGame}
          onJoin={this.handleJoin}
        ></Games>
      </div>
    );
  }

}
