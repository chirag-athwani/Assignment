import React, { Component } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="root">
        <Dashboard />
      </div>
    );
  }
}

export default App;
