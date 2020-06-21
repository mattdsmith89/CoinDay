import React, { Component } from "react";

export class Loading extends Component {
  render() {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}