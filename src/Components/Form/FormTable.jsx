import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class FormTable extends Component {
  state = {
    profile: null,
    name: "",
    email: "",
  };


  adddUser(e) {
    e.preventDefault();
    const { profile, name, email } = this.state;
    this.props.create({
      profile,
      name,
      email,
      id:this.props.userToEdit.id
    });
  }

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <Form onSubmit={(e) => this.adddUser(e)}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="name"
              name="name"
              id="name"
              required
              onChange={e => this.setState({ name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              required
              name="email"
              id="email"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Image</Label>
            <Input
              type="file"
              accept="image/*"
              required
              name="image"
              id="image"
              onChange={e=> this.setState({profile:e.target.files[0]})}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default FormTable;
