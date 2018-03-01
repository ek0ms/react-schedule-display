import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import YAxis from "./YAxis";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {
        event1: { start: 60, end: 120 },
        event2: { start: 100, end: 240 },
        event3: { start: 700, end: 720 }
      }
    };
  }
  render() {
    return (
      <div>
        <h1>Schedule</h1>
        <div className="dayView">
          <YAxis />
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
