import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClearPlayer();
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>
          Hello, {this.props.name}.
        </p>
        <Button color="secondary" size="sm" onClick={this.handleClick}>
          Not {this.props.name}?
        </Button>
      </div>
    );
  }

}
