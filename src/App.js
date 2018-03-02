import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import YAxis from "./YAxis";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        { key: "event1", start: 60, end: 120 },
        { key: "event2", start: 100, end: 240 },
        { key: "event3", start: 700, end: 720 }
      ],
      eventer: {
        event1: {
          start: 60,
          end: 120
        },
        event2: {
          start: 100,
          end: 240
        },
        event3: {
          start: 700,
          end: 720
        },
        event4: {
          start: 80,
          end: 240
        },
        event5: {
          start: 200,
          end: 240
        }
      }
    };
  }

  render() {
    layOutDay(this.state.eventer);
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

function layOutDay(data) {
  // A sorted array of the event data
  let eventEntriesArray = sortArrayByStartThenEnd(Object.entries(data));

  const blockWidth = 600;

  // Helper function to determine if two events that collide
  const collidesWith = (event1, event2) =>
    event1.end > event2.start && event1.start < event2.end;

  console.log(eventPlacer(eventEntriesArray));

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
        columns.forEach((group, columnsIndex) => {
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
              placed === false
            ) {
              // If the event does not collide && it has not been placed yet,
              // it will be placed in its current group
              group.push(currentEvent);
              placed = true;
              break;
            }
          }
        });
      }
    });
    return columns;
  }
  // } else if (
  //   lastEventEndTime !== null &&
  //   currentEvent.start >= lastEventEndTime
  // ) {
  //   columns.push(array[index]);
  //   lastEventEndTime == null;
  // }
  // else {
  //   columns.push.concat(array[index])
  // }

  // Assigns lastEventEndTime to be the time of the latest(time-wise) event
  // lastEvent = event[index];
  // if (lastEventEndTime === null || currentEvent.end > lastEventEndTime) {
  //   lastEventEndTime = currentEvent.end;
  // }

  // restructuredEvents.forEach(currentEvent => {
  //   // Check to see if the current event start time overlaps with last event end time
  //   if (lastEventEndTime !== null && currentEvent.start >= lastEventEndTime) {
  //     // If there is no overlap, the event stays in the same column
  //     packEvents(columns, blockWidth);
  //     columns = [];
  //     lastEventEndTime = null;
  //   }
  //
  //   let placed = false;
  //   for (let i = 0; i < columns.length; i++) {
  //     const currentColumn = columns[i];
  //     if (
  //       !collidesWith(currentColumn[currentColumn.length - 1], currentEvent)
  //     ) {
  //       // If last event in the column does not collide with the current event,
  //       // place it in the same column
  //       currentColumn.push(currentEvent);
  //       placed = true;
  //       break;
  //     }
  //   }
  //
  //   // If it was not possible to place the currentEvent in the currentColumn
  //   // because of overlap, push the event into a new column
  //   if (!placed) {
  //     columns.push([currentEvent]);
  //   }
  //
  //   // Assigns lastEventEndTime to be the time of the latest(time-wise) event
  //   if (lastEventEndTime === null || currentEvent.end > lastEventEndTime) {
  //     lastEventEndTime = currentEvent.end;
  //   }
  //
  //   if (columns.length > 0) {
  //     packEvents(columns, blockWidth);
  //   }
  // });

  // Function to determine left and width of events
  // const packEvents = (columns, blockWidth) => {
  //   let array = [];
  //   const numberOfColumns = columns.length;
  //   for (let columnsIndex = 0; columnsIndex < numberOfColumns; columnsIndex++) {
  //     const currentColumn = columns[columnsIndex];
  //     for (
  //       let currentColumnIndex = 0;
  //       currentColumnIndex < currentColumn.length;
  //       currentColumnIndex++
  //     ) {
  //       const event = currentColumn[currentColumnIndex];
  //       array.push(
  //         Object.assign(event, {
  //           left: `${columnsIndex / numberOfColumns * 100}%`,
  //           width: blockWidth / numberOfColumns - 1
  //         })
  //       );
  //       // let colSpan = expandEvent(event, i, columns);
  //     }
  //   }
  //   console.log(array);
  // };

  // Iterate over JSON input and output an array of newly mapped event objects
  // let restructuredEvents = Object.entries(events).map(eventInfo => {
  //   const [id, { start, end }] = eventInfo;
  //   return {
  //     id,
  //     start,
  //     end,
  //     left: ``,
  //     top: `${start}px`,
  //     width: ``
  //   };
  // });

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
}
