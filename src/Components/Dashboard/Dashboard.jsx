import React, { Component } from "react";
import { Card, Navbar, NavbarBrand, Button } from "reactstrap";
import "./Dashboard.scss";

import Counter from "../Counter/Counter";
import FormTable from "../Form/FormTable";
import TableData from "../Form/TableData";
import fireStore, { storage } from "../../utils/firebase";

class Dashboard extends Component {
  state = {
    block: true,
    user: [],
    filteredData: [],
    userToEdit: {
      name: "",
      email: "",
      profile: null
    },
    url: "",
    progress: 0
  };

  componentDidMount() {
    this.getAll();
  }

  handleUpload = ({ profile, name, email, id }) => {
    const uploadTask = storage.ref(`images/${profile.name}`).put(profile);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(profile.name)
          .getDownloadURL()
          .then(url => {
            this.createUser(url,name, email, id);
          });
      }
    );
  };

  async getAll() {
    try {
      const user = await fireStore.getAll();
      if (!user) {
        this.setState({ user: null, filteredData: null });
      } else {
        this.setState({
          user: Object.entries(user),
          filteredData: Object.entries(user)
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    await fireStore.remove(id);
    await this.getAll();
  }

  createUser = (url,name, email, id) => {
    fireStore.write(id, {
      url,
      name,
      email
    });
    this.getAll();
  };

  changeBlock = () => {
    this.setState({ block: !this.state.block });
  };

  render() {
    return (
      <div className="dashboard">
        <Navbar color="none" light expand="md" id="head">
          <NavbarBrand style={{ width: "100%" }}>
            <Button onClick={this.changeBlock}>
              {this.state.block ? "Counter" : "Form"}
            </Button>
          </NavbarBrand>
        </Navbar>
        {this.state.block ? (
          <>
            <Card className="formCard">
              <FormTable
                create={user => this.handleUpload(user)}
                userToEdit={this.state.userToEdit}
              />
            </Card>
            <div className="tableCard">
              <TableData
                userToEdit={userToEdit => this.setState({ userToEdit })}
                users={this.state.filteredData}
                remove={user => this.remove(user)}
              />
            </div>
          </>
        ) : (
          <Card className="counterCard">
            <Counter />
          </Card>
        )}
      </div>
    );
  }
}

export default Dashboard;
