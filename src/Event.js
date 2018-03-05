/* eslint react/prop-types: 0 */

import React from "react";

const Event = props => (
  <div className="event" style={props.eventStyle}>
    <h4 className="event-title">{props.eventTitle}</h4>
    <p className="event-location">{props.eventLocation}</p>
  </div>
);

export default Event;
