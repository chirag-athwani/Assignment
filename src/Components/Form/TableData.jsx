import React, { Component } from "react";
import { Table } from "reactstrap";
import "./Form.css";


class TableData extends Component {
  render() {
    return (
      <Table
        dark
        striped
        style={{
          width: "100%",
          border: "1px black solid",
          borderRadius: "5px"
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{
              this.props.users && this.props.users.map((user, index) =>
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><img className="profile" src={user[1].url} alt="#"></img></td>
                  <td>{user[1].name}</td>
                  <td>{user[1].email}</td>
                  <td>
                    <span className="actions" onClick={() => this.props.remove(user[0])} id="deleteTooltip" aria-hidden>&#x1f5d1;</span>
                  </td>
                </tr>
              )
            }</tbody>
      </Table>
    );
  }
}

export default TableData;
