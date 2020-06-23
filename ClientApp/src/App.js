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
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleNewRoom = this.handleNewRoom.bind(this);
    this.state = {
      playerId: null,
      rooms: null,
      name: null,
      loading: true,
      connected: false,
    };
  }

  async componentDidMount() {
    const storage = window.localStorage;
    const playerId = storage.getItem("playerId");
    const player = await this.getPlayer(playerId);
    const rooms = await this.getRooms();
    if (player) {
      this.setState({ playerId: player.id, name: player.name });
    }
    this.setState({ rooms, loading: false });
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

  handleCreateRoom() {
    this.createRoom(this.state.playerId);
  }

  async handleNewRoom() {
    const rooms = await this.getRooms();
    this.setState({ rooms });
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

  async getRooms() {
    const resp = await fetch("game/room");
    let rooms = [];
    if (resp.ok) {
      rooms = await resp.json();
    }
    return rooms;
  }

  async createRoom(playerId) {
    const resp = await fetch("game/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    });
    if (resp.ok) {
      this.setState({ rooms: [...this.state.rooms, await resp.json()] });
    }
  }

  render() {
    return (
      <Layout connected={this.state.connected}>
        <SignalR 
          onConnect={this.handleConnected} 
          onDisconnect={this.handleDisconnected}
          onNewRoom={this.handleNewRoom} />
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
                    rooms={this.state.rooms}
                    onClearPlayer={this.handleClear}
                    onCreateRoom={this.handleCreateRoom} />
                : <Join onJoin={this.handleJoin} />
          }}
        />
      </Layout>
    );
  }
}
