import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

export default class PlayArea extends Component {
  render() {
    const { playArea } = this.props;
    const { player } = playArea;
    return (
      <div className="mb-2">
        <Card>
          <CardHeader>{player.name}</CardHeader>
          <CardBody>
          </CardBody>
        </Card>
      </div>
    );
  }
}