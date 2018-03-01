/* eslint react/prop-types: 0 */

import React from "react";

const Event = props => (
  <div className="event" style={props.eventStyle}>
    <h4 className="eventTitle">{props.eventTitle}</h4>
    <p className="eventLocation">{props.eventLocation}</p>
  </div>
);

export default Event;
