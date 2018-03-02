/* eslint react/prop-types: 0 */

import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  renderEvent(event) {
    const eventStyle = {
      height: `${event.end - event.start}px`,
      top: event.top,
      width: "calc(100% - 20px)"
    };

    return (
      <Event
        eventTitle="Event 2"
        eventLocation="Boston, MA"
        eventStyle={eventStyle}
      />
    );
  }

  render() {
    const { events } = this.props.events;

    return (
      <div className="eventList">
        {this.renderEvent(this.props.events[0])}
        {/* {this.renderEvent(this.props.events["event2"])} */}
        {this.renderEvent(this.props.events[2])}
        {/* {this.renderEvent()}
        {this.renderEvent()}
        {this.renderEvent()}
        {this.renderEvent()}
        {this.renderEvent()}
        {this.renderEvent()}
        {this.renderEvent()} */}
      </div>
    );
  }
}

export default EventList;
