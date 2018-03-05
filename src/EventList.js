import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  renderEvent(i) {
    const event = this.props.events[i];
    const eventStyle = {
      height: `${event.end - event.start}px`,
      top: event.top,
      width: event.width,
      left: event.left
    };

    return (
      <Event
        key={event.id}
        eventTitle="Sample Title"
        eventLocation="Sample Location, SL"
        eventStyle={eventStyle}
      />
    );
  }

  render() {
    const array = [];

    for (let i = 0; i < this.props.events.length; i += 1) {
      array.push(this.renderEvent(i));
    }

    return (
      <div className="event-list">
        <div className="padding-wrapper">{array}</div>
      </div>
    );
  }
}

export default EventList;
