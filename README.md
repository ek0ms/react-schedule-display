---

## Overview

This was completed in ReactJS. The majority of the functionality resides in App.js.

**Event.js:** Returns Event class with properties gathered from EventList.js

**EventList.js:** Provides function that creates creates and renders Events from properties gathered from App.js

**App.js:** Data is fetched from API, sorted, restructured, and rendered after

**YAxis.js:** Provides structure for the time slots on the left of the calendar

## Install

Move to root project folder and with npm:

```
npm install
```

## Usage

**To run:** Move to root folder and with npm:

```
npm start
```

## Details

**In App.js**:

1.  Data is fetched in ComponentDidMount() and the state is updated
2.  The function layOutDay is then called and passed the newly updated state data
3.  The function returns an array of event objects with appropriate properties and this data is passed to EventList
4.  EventList creates Event's with the new data

#####The inner workings of the functions and methods are furthered explained in the comments of the source code
