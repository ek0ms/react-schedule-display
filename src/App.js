import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import YAxis from "./YAxis";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: {
        NineTo920: { start: 0, end: 20 }, // an event from 10:40am to 1pm
        NineTo950: { start: 0, end: 50 }, // an event from 10:40am to 1pm
        NineTo1130: { start: 0, end: 150 },
        Nine30To1130: { start: 30, end: 150 },
        TenTo11: { start: 60, end: 120 }, // an event from 10am to 11am
        event2: { start: 100, end: 240 }, // an event from 10:40am to 1pm
        event56: { start: 140, end: 180 },
        event256: { start: 140, end: 180 },
        event4: { start: 100, end: 240 }, // an event from 10:40am to 1pm
        sssss: { end: 360, start: 300 },
        event6: { start: 700, end: 720 }, // an event from 8:40pm to 9pm
        event67: { start: 600, end: 660 }, // an event from 8:40pm to 9pm
        event62: { start: 600, end: 660 }, // an event from 8:40pm to 9pm
        event63: { start: 600, end: 660 }, // an event from 8:40pm to 9pm
        event64: { start: 600, end: 660 }, // an event from 8:40pm to 9pm
        event65: { start: 600, end: 660 }, // an event from 8:40pm to 9pm
        "-K2rlKbFfXz3OEoxRBJU": { end: 650, start: 540 },
        "-K2rlLd-VjcZ_rtBlVuM": { end: 620, start: 560 },
        "-K2rlMb_GD98QiMk8zGF": { end: 700, start: 630 },
        asd22BlVuM: { end: 720, start: 600 },
        asd2BlVuM: { end: 720, start: 600 },
        asd32BlVuM: { end: 720, start: 600 },
        pozza: { end: 650, start: 540 },
        asdfff: { end: 620, start: 560 }
      }
    };
  }

  // // Function for fetching API data
  // componentDidMount() {
  //   fetch("https://appcues-interviews.firebaseio.com/calendar/events.json")
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const events = data;
  //
  //       this.setState({ events });
  //     });
  // }

  render() {
    return (
      <div>
        <h1>Appcues Calendar</h1>
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
  // Helper fucntion to sort events by starting time, then by ending time
  const sortArrayByStartThenEnd = array =>
    array.sort(([, event1], [, event2]) => {
      if (event1.start < event2.start) return -1;
      if (event1.start > event2.start) return 1;
      if (event1.end < event2.end) return -1;
      if (event1.end > event2.end) return 1;
      return 0;
    });

  // Helper function to determine if two events collide
  const collidesWith = (event1, event2) =>
    event1.end > event2.start && event1.start < event2.end;

  // Function to place events; input is a sorted array of the events
  // Output is a multidemensional array where the elements are vertical groups(arrays) of the events
  const eventPlacer = arrayParam => {
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
          columnsIndex += 1
        ) {
          const group = columns[columnsIndex];

          for (let groupIndex = 0; groupIndex < group.length; groupIndex += 1) {
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
  };

  // Function that iterates through the columns and attaches the
  // number of colliding events to the event of that row
  const numEventsInRowAdder = columns => {
    // Function to calculate the number of events in the row
    const eventsInRow = (event, columnsIndex, columns) => {
      let numEventsInRow = columnsIndex + 1;

      for (let i = columnsIndex + 1; i < columns.length; i += 1) {
        // Iterate starting with the column after the current one
        const nextColumn = columns[i];
        for (let j = 0; j < nextColumn.length; j += 1) {
          // Iterate through the events on that are in the goup
          const nextEvent = nextColumn[j];
          if (collidesWith(event[1], nextEvent[1])) {
            // If the event collides with the event it is checking, increase the
            // counter && break out of the loop
            numEventsInRow += 1;
            break;
          }
        }
      }
      return numEventsInRow;
    };

    // Iterate through the original columns array and return the same array
    // but with number of events in the row attached as a property to each event
    return columns.map((group, columnsIndex) => {
      return group.map(currEvent => {
        const numEventsInRow = {
          numEventsInRow: eventsInRow(currEvent, columnsIndex, columns)
        };
        currEvent[1] = Object.assign(currEvent[1], numEventsInRow);
        return currEvent;
      });
    });
  };

  // Helper function to provide a factor to calculate left and width properties
  const widthLeftFactor = (event, columnsIndex, columns) => {
    // Start by assuming highest factor is the number of colliding events in the row
    let highestFactor = event[1].numEventsInRow;
    let firstCollidingEventIndex = null;

    // For the current event, if the next column index is equal to the highest
    // factor, it assigns the firstCollidingEventIndex to its own column index + 1
    // This is for assigning firstCollidingEventIndex correctly for the last event in the row
    if (columnsIndex + 1 === highestFactor) {
      firstCollidingEventIndex = columnsIndex + 1;
    }

    for (let i = columnsIndex + 1; i < columns.length; i += 1) {
      // Iterate starting with the column after the current one
      const nextColumn = columns[i];
      for (let j = 0; j < nextColumn.length; j += 1) {
        // Iterate through the events on that are in the goup
        const nextEvent = nextColumn[j];
        if (collidesWith(event[1], nextEvent[1])) {
          // If firstCollidingEventIndex has not been assigned a value yet,
          // assign it with the first event it collides with
          if (firstCollidingEventIndex == null) {
            firstCollidingEventIndex = i;
          }

          // As it iterates through the horizontally colliding events, it
          // will assign highestFactor with the higher of the two event's numEventsInRow property
          highestFactor = Math.max(
            event[1].numEventsInRow,
            nextEvent[1].numEventsInRow
          );
          break;
        }
      }
    }

    // It returns the product of (one fraction of the highest factor of events in the row)
    // and (the amount of times it should be multiplied based off of the current
    // event's index and the first event it collides with)
    return [
      1 / highestFactor * (firstCollidingEventIndex - columnsIndex),
      highestFactor
    ];
  };

  // Iterate through the array of columns and reconstruct the objects, add properties,
  // and return them in an array
  function eventRestructurer(columns) {
    const containerWidth = 620;
    const resultArray = [];
    columns.forEach((group, columnsIndex) => {
      group.forEach(event => {
        const factorWL = widthLeftFactor(event, columnsIndex, columns);
        resultArray.push({
          id: `${event[0]}`,
          start: event[1].start,
          end: event[1].end,
          top: `${event[1].start}px`,
          width: containerWidth * factorWL[0],
          left: `${columnsIndex / factorWL[1] * 100}%`
        });
      });
    });
    return resultArray;
  }

  return eventRestructurer(
    numEventsInRowAdder(
      eventPlacer(sortArrayByStartThenEnd(Object.entries(data)))
    )
  );
}
