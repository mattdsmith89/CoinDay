import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.joinServer();
  }

  async joinServer() {
    const name = this.state.value;
    const response = await fetch("game/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    this.props.onJoin(await response.json());
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h5>Join</h5>
          </CardTitle>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>
                Name
                <Input type="text" value={this.state.value} onChange={this.handleChange} />
              </Label>
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}