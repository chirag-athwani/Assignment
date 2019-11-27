import React, { Component } from "react";
import { Button, Fade, Card } from "reactstrap";
import "./Counter.css";
import Bored from "../../Assets/Bored.jpg";
import Heart from "../../Assets/Heart.jpg";
import Salute from "../../Assets/Salute.jpg";
import Teeth from "../../Assets/Teeth.jpg";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false,
      emojis: [
        { name: Bored, id: 1, counter: 1 },
        { name: Heart, id: 2, counter: 1 },
        { name: Salute, id: 3, counter: 1 },
        { name: Teeth, id: 4, counter: 1 }
      ],
      count: []
    };
  }

  toggle = () => {
    this.setState({ fadeIn: !this.state.fadeIn });
  };

  addition(id) {
    const emojiIndex = this.state.emojis.findIndex(_ => _.id === id);
    let count = [...this.state.count];
    count.push(this.state.emojis[emojiIndex]);
    this.setState({
      count
    });
  }

  increment(id) {
    const index = this.state.count.findIndex(_ => _.id === id);
    if (index < 0) {
      this.addition(id);
    } else {
      const { count } = this.state;
      count[index].counter = this.state.count[index].counter + 1;
      this.setState({
        count
      });
    }
  }

  render() {
    return (
      <>
        <Fade in={this.state.fadeIn} className="mt-3">
          <Card id="emojis">
            {this.state.emojis.map((emoji, index) => (
              <img
                onClick={() => this.increment(emoji.id)}
                key={index}
                className="image"
                alt="#"
                src={emoji.name}
              />
            ))}
          </Card>
        </Fade>
        <Button color="primary" id="toggleFade" onClick={this.toggle}>
          Show Emojis
        </Button>
        <div className="count">
          {this.state.count.map((emoji, index) => (
            <span className="arrange" key={index}>
              <img className="icon" alt="#" src={emoji.name}></img>
              <p>{emoji.counter}</p>
            </span>
          ))}
        </div>
      </>
    );
  }
}

export default Counter;
