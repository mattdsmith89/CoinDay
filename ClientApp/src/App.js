import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SignalR } from './components/SignalR';
import { Join } from './components/Join';

import './custom.css'
import { Loading } from './components/Loading';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleNewGameCreated = this.handleNewGameCreated.bind(this);
    this.handleGameUpdated = this.handleGameUpdated.bind(this);
    this.state = {
      playerId: null,
      games: null,
      name: null,
      loading: true,
      connected: false,
    };
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

  handleCreateGame() {
    this.createGame(this.state.playerId);
  }

  async handleNewGameCreated() {
    const games = await this.getGames();
    this.setState({ games });
  }

  handleGameUpdated() {
    this.handleNewGameCreated();
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
                    onCreateGame={this.handleCreateGame} />
                : <Join onJoin={this.handleJoin} />
          }}
        />
      </Layout>
    );
  }
}
