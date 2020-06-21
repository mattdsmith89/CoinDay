import React, { PureComponent } from "react";
import * as signalR from "@microsoft/signalr";

export class SignalR extends PureComponent {
  constructor(props) {
    super(props);
    this.connection = null;
    this.connected = false;
    this.onMessage = this.onMessage.bind(this);
  }

  render() {
    return <span />;
  }

  async componentDidMount() {
    const options = {
      logMessageContent: true
    };

    if (!this.connected) {
      this.connection = new signalR
        .HubConnectionBuilder()
        .withUrl("/gameHub", options)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }

    this.connection.on("Message", this.onMessage);

    await this.connection.start();
    this.connected = true;
  }

  componentWillUnmount() {
    this.connection.stop();
  }

  onMessage(message) {
    console.log(message);
  }
}