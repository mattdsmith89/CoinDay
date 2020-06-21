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
    this.state = {
      playerId: null,
      name: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const storage = window.localStorage;
    const playerId = storage.getItem("playerId");
    const player = await this.getPlayer(playerId);
    if (player) {
      this.setState({ playerId: player.id, name: player.name });
    }
    this.setState({ loading: false });
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

  async getPlayer(id) {
    const resp = await fetch(`game/player/${id}`);
    let player = null;
    if (resp.ok) {
      player = await resp.json();
    }
    return player;
  }

  render() {
    return (
      <Layout>
        <SignalR />
        <Route
          exact
          path='/'
          render={() => {
            return this.state.loading
              ? <Loading />
              : this.state.playerId
                ? <Home name={this.state.name} onClearPlayer={this.handleClear} />
                : <Join onJoin={this.handleJoin} />
          }}
        />
      </Layout>
    );
  }
}
