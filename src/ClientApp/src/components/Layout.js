import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="d-flex flex-column h-100">
        <NavMenu connected={this.props.connected} />
        <Container className="flex-fill">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
