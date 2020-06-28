import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import SignalR from './components/SignalR';
import Join from './components/Join';
import Game from './components/Game';
import Loading from './components/Loading';

import './custom.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleNewGameCreated = this.handleNewGameCreated.bind(this);
    this.handleGameUpdated = this.handleGameUpdated.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
    this.state = {
      playerId: null,
      games: null,
      name: null,
      loading: true,
      connected: false,
    };
  }

  get currentGame() {
    if (!this.state.games)
      return null;

    return this.state.games.find(x =>
      x.players.some(y => y.id === this.state.playerId));
  }

  async componentDidMount() {
    const storage = window.localStorage;
    const playerId = storage.getItem("playerId");
    const player = await this.getPlayer(playerId);
    const games = await this.getGames();
    if (player) {
      this.setState({ playerId: player.id, name: player.name });
    }
    this.setState({ games, loading: false });
  }

  handleJoin({ id, name }) {
    const storage = window.localStorage;
    storage.setItem("playerId", id);
    this.setState({ playerId: id, name });
  }

  handleClear() {
    const storage = window.localStorage;
    storage.removeItem("playerId");
    this.setState({ playerId: null, name: null });
  }

  async handleCreateGame() {
    const { history } = this.props;
    const { playerId } = this.state;
    await this.createGame(playerId);

    history.push("/play");
  }

  async handleJoinGame() {
    const { history } = this.props;
    await this.updateGames();
    history.push("/play");
  }

  handleNewGameCreated() {
    this.updateGames();
  }

  handleGameUpdated() {
    this.updateGames();
  }

  async updateGames() {
    const games = await this.getGames();
    this.setState({ games });
  }

  handleConnected() {
    this.setState({ connected: true });
  }

  handleDisconnected() {
    this.setState({ connected: false });
  }

  async getPlayer(id) {
    const resp = await fetch(`game/player/${id}`);
    let player = null;
    if (resp.ok) {
      player = await resp.json();
    }
    return player;
  }

  async getGames() {
    const resp = await fetch("game");
    let games = [];
    if (resp.ok) {
      games = await resp.json();
    }
    return games;
  }

  async createGame(playerId) {
    const resp = await fetch("game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    });
    if (resp.ok) {
      this.setState({ games: [...this.state.games, await resp.json()] });
    }
  }

  render() {
    return (
      <Layout connected={this.state.connected}>
        <SignalR
          onConnect={this.handleConnected}
          onDisconnect={this.handleDisconnected}
          onNewGame={this.handleNewGameCreated}
          onGameUpdated={this.handleGameUpdated}
        />
        <Route
          exact
          path='/'
          render={() => {
            return this.state.loading
              ? <Loading />
              : this.state.playerId
                ? <Home
                  name={this.state.name}
                  playerId={this.state.playerId}
                  games={this.state.games}
                  onClearPlayer={this.handleClear}
                  onCreateGame={this.handleCreateGame}
                  onJoinGame={this.handleJoinGame}
                />
                : <Join onJoin={this.handleJoin} />
          }}
        />
        <Route
          path="/play"
          render={() => {
            return this.state.loading
              ? <Loading />
              : this.currentGame
                ? <Game game={this.currentGame} />
                : <Redirect to="/" />
          }}
        />
      </Layout>
    );
  }
}

export default withRouter(App);
