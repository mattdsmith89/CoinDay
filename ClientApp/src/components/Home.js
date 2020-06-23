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

  isInRoom(playerId, room) {
    return room.players.some(player => player.id === playerId);
  }

  canCreate(playerId, rooms) {
    return rooms != null && !rooms.some(room => this.isInRoom(playerId, room))
  }

  handleNotYouClick() {
    this.props.onClearPlayer();
  }

  handleNewClick() {
    this.props.onCreateRoom();
  }

  render() {
    const loading = (<Loading></Loading>);
    const rooms = this.props.rooms ? this.props.rooms : [];
    const roomsList = (
      <Card className="mb-3">
        <ul className="list-group list-group-flush">
          {rooms.length
            ? rooms.map(x => (
              <li key={x.id} className="list-group-item">
                {x.players.map(y => (
                  <Badge key={y.id} color={y.id === this.props.playerId ? "primary" : "secondary"}>{y.name}</Badge>
                ))}
              </li>))
            : <li className="list-group-item">No rooms</li>}
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
            <CardTitle><h5>Rooms</h5></CardTitle>
            {this.props.rooms ? roomsList : loading}
            {this.canCreate(this.props.playerId, this.props.rooms) ? <Button color="primary" onClick={this.handleNewClick}>New</Button> : null}
          </CardBody>
        </Card>
      </div>
    );
  }

}
