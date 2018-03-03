import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import YAxis from "./YAxis";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {
        event1: { start: 60, end: 120 }, // an event from 10am to 11am
        event2: { start: 100, end: 240 }, // an event from 10:40am to 1pm
        event3: { start: 700, end: 720 }, // an event from 8:40pm to 9pm
        "-K2rlJ-nkJBtkLHL0QmO": { end: 150, start: 30 },
        "-K2rlKbFfXz3OEoxRBJU": { end: 650, start: 540 },
        "-K2rlLd-VjcZ_rtBlVuM": { end: 620, start: 560 },
        "-K2rlMb_GD98QiMk8zGF": { end: 700, start: 630 }
      }
    };
  }

  render() {
    return (
      <div>
        <h1>Schedule</h1>
        <div className="dayView">
          <YAxis />
          <EventList events={layOutDay(this.state.events)} />
        </div>
      </div>
    );
  }
}

export default App;

function layOutDay(data) {
  // A sorted array of the event data
  const eventEntriesArray = sortArrayByStartThenEnd(Object.entries(data));
  const blockWidth = 620;

  const eventedColumns = eventPlacer(eventEntriesArray);
  return eventRestructurer(eventedColumns, blockWidth);

  // Function to place events; input is a sorted array of the events
  // Output is a multidemensional array where the elements are vertical groups(arrays) of the events
  function eventPlacer(arrayParam) {
    const columns = [];

    arrayParam.forEach(([, currentEventValues], currentEventIndex) => {
      const currentEvent = arrayParam[currentEventIndex];
      let placed = false;

      if (currentEventIndex === 0) {
        // The first element of the input gets pushed into the returning array as an array [event]
        columns.push([currentEvent]);
      } else {
        // Iterate through the returning array of groups
        for (
          let columnsIndex = 0;
          columnsIndex < columns.length;
          columnsIndex++
        ) {
          const group = columns[columnsIndex];

          for (let groupIndex = 0; groupIndex < group.length; groupIndex++) {
            // Iterate through the events that are in the group
            const iteratingEventValues = group[groupIndex][1];
            if (
              collidesWith(iteratingEventValues, currentEventValues) &&
              groupIndex === group.length - 1 &&
              columnsIndex === columns.length - 1 &&
              placed === false
            ) {
              // If the event from the input does not collide with the event in the group
              // && it is at the bottom of the schedule && it is in the last column
              // && it has not been placed yet, it will create a new column and place
              // the event there
              columns[columnsIndex + 1] = [].concat([currentEvent]);
              placed = true;
            } else if (
              collidesWith(iteratingEventValues, currentEventValues) ===
                false &&
              groupIndex === group.length - 1 &&
              placed === false
            ) {
              // If the event does not collide && it has not been placed yet,
              // it will be placed in its current group
              // Break out of group loop when placed
              group.push(currentEvent);
              placed = true;
              break;
            }
          }
          // Break out of column loop if event has been placed
          if (placed) {
            break;
          }
        }
      }
    });
    return columns;
  }

  // Iterate through the array of columns and reconstruct the objects, add properties,
  // and return them in an array
  function eventRestructurer(columns, blockWidth) {
    const resultArray = [];
    const numberOfColumns = columns.length;
    columns.forEach((group, columnsIndex) => {
      group.forEach(event => {
        const factor = leftWidthFactor(event, columnsIndex, columns);
        resultArray.push({
          id: `${event[0]}`,
          start: event[1].start,
          end: event[1].end,
          top: `${event[1].start}px`,
          left: `${columnsIndex / numberOfColumns * 100 * factor}%`,
          width: blockWidth / numberOfColumns * factor
        });
      });
    });
    return resultArray;
  }

  // Helper function to provide a factor to calculate left and width properties
  function leftWidthFactor(event, columnsIndex, columns) {
    const eventValues = event[1];
    let factor = columns.length - columnsIndex;

    for (let i = columnsIndex + 1; i < columns.length; i++) {
      // Iterate starting with the column after the current one
      const nextColumn = columns[i];
      for (let j = 0; j < nextColumn.length; j++) {
        // Iterate through the events on that are in the goup
        const nextEventValues = nextColumn[j][1];
        if (collidesWith(eventValues, nextEventValues)) {
          // If the event collides with the event it is checking, decrease the
          // factor && break out of the loop
          factor--;
          break;
        }
      }
    }
    if (factor === 1) {
      // If the factor is 1, the number of colliding events in the horzizontal
      // row is equal to the number of columns
      return factor;
    } else {
      return columns.length / factor;
    }
  }

  // Helper fucntion to sort events by starting time, then by ending time
  function sortArrayByStartThenEnd(array) {
    return array.sort(([, event1], [, event2]) => {
      if (event1.start < event2.start) return -1;
      if (event1.start > event2.start) return 1;
      if (event1.end < event2.end) return -1;
      if (event1.end > event2.end) return 1;
      return 0;
    });
  }

  // Helper function to determine if two events collide
  function collidesWith(event1, event2) {
    return event1.end >= event2.start && event1.start <= event2.end;
  }
}
