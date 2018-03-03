/* eslint react/prop-types: 0 */

import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  renderEvent(event) {
    const eventStyle = {
      height: `${event.end - event.start}px`,
      top: event.top,
      width: event.width,
      left: event.left
    };

    return (
      <Event
        key={event.id}
        eventTitle="Sample Event"
        eventLocation="Sample Location, SL"
        eventStyle={eventStyle}
      />
    );
  }

  render() {
    const array = [];
    const [...events] = this.props.events;

    for (let i = 0; i < events.length; i++) {
      array.push(this.renderEvent(events[i]));
    }

    return (
      <div className="eventList">
        <div className="paddingWrapper">{array}</div>
      </div>
    );
  }
}

export default EventList;
