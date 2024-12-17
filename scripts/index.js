"use strict";

const items = [];
const headers = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
const days = [];


const createElement = (elementType, elementClass, elementText) => {
  const element = document.createElement(elementType);
  if (elementClass) {
    element.classList.add(elementClass);
  }
  if (elementText) {
    element.textContent = elementText;
  }
  return element;
};

function convertIcsToJavascript(timeString) {
  const YYYY = timeString.slice(0, 4);
  const MM = timeString.slice(4, 6);
  const DD = timeString.slice(6, 8);
  const hh = timeString.slice(9, 11);
  const mm = timeString.slice(11, 13);
  const ss = timeString.slice(13, 15);
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}`;
}

const addEvent = (uid, dtStart, dtEnd, summary, description) => {


  let newEvent = {
    uid: uid,
    dtStart: convertIcsToJavascript(dtStart),
    dtEnd: convertIcsToJavascript(dtEnd),
    summary: summary,
    description: description,
  };
  items.push(newEvent);
  return items;
}

const generateCalendar = (year = new Date().getFullYear(), month = new Date().getMonth()) => {


  //CLEAR PREVIOUS CONTENT + WRITE HEADER + LOGICAL PART OF GETTING THE AMOUNT OF DAYS RIGHT
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Clear any previous content

  headers.forEach(day => {
    const headerDiv = createElement("header", "header", day);
    calendar.appendChild(headerDiv);
  }); //HEADERS FOR CALENDAR

  // Get the first day of the month and total days in the month
  const firstDay = new Date(year, month, 0).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get today's date
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const currentDate = today.getDate();

  // Add blank spaces for days before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.classList.add('filler');
    calendar.appendChild(blank);
  }

  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayRaster = createElement('div', 'day-grandparent');
    const dayHeader = createElement('div', 'day-header');
    const dayDate = createElement('div', 'day-date', `${day}`);
    const addEventButton = createElement('button', 'add-event-button', '+')
    dayHeader.appendChild(dayDate)
    dayHeader.appendChild(addEventButton)
    const dayEventsContainer = createElement('div', 'day-events-container');

    dayRaster.appendChild(dayHeader)
    dayRaster.appendChild(dayEventsContainer)


    if (isCurrentMonth && day === currentDate) {
      dayRaster.classList.add("today-highlight"); // Add highlight class
    }
    calendar.appendChild(dayRaster);
  }
}
// Example: Generate December 2024 calendar
generateCalendar(); // Default is current date, optional parameters are (year, month (0 indexed))


const printEvents = () => {
  console.log("Current Events:");
  items.forEach(event => {
    console.log(`UID: ${event.uid}`);
    console.log(`Start: ${event.dtStart}`);
    console.log(`End: ${event.dtEnd}`);
    console.log(`Summary: ${event.summary}`);
    console.log(`Description: ${event.description}`);
    console.log("--------");
  });
};

// ADD EVENT BUTTON EVENT LISTENER
document.querySelectorAll('.add-event-button').forEach(button => {
  button.addEventListener('click', () => {
    const dateSelected = button.textContent;
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const startTime = prompt("Enter start time in HH:MM format (e.g., 13:00):");
    if (startTime === null) {
      return; // Exit if 'Cancel' is pressed on the first prompt
    }
    const duration = prompt("Enter event duration in hours (e.g., 2):");
    if (duration === null) {
      return; // Exit if 'Cancel' is pressed on the second prompt
    }
    const summary = prompt("Enter event summary:");
    if (summary === null) {
      return; // Exit if 'Cancel' is pressed on the third prompt
    }
    const description = prompt("Enter event description:");
    if (description === null) {
      return; // Exit if 'Cancel' is pressed on the fourth prompt
    }

    if (startTime && duration && summary && description) {
      const formattedDate = `${String(year)}${String(month + 1).padStart(2, '0')}${String(dateSelected).padStart(2, '0')}`;

      // Calculate the end time
      const [startHour, startMinute] = startTime.split(':').map(num => parseInt(num, 10));
      const endHour = startHour + parseInt(duration, 10);
      const endTime = `${String(endHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;

      addEvent(
        `UID${Date.now()}`, // Generate a UID based on timestamp
        `${formattedDate}T${startTime.replace(':', '')}`,
        `${formattedDate}T${endTime.replace(':', '')}`,
        summary,
        description
      );

      // Re-render the calendar to include the new event
      printEvents();
      generateCalendar(year, month);
    }
  });
});


// document.querySelectorAll('.day').forEach(day => {
//   day.addEventListener('click', () => {
//     const dateSelected = day.textContent;
//     const year = 2024; // Update this as per your calendar's year context
//     const month = 11;  // Update this as per your calendar's month context (11 = December)
//
//     const eventsForDay = items.filter(event => {
//       const eventDate = new Date(event.dtStart);
//       const eventDay = eventDate.getDate();
//       const eventMonth = eventDate.getMonth();
//       const eventYear = eventDate.getFullYear();
//
//       return eventDay === parseInt(dateSelected) && eventMonth === month && eventYear === year;
//     });
//
//     console.log(`Events for ${year}-${month + 1}-${dateSelected}:`);
//     eventsForDay.forEach(event => {
//       console.log(`Summary: ${event.summary}`);
//       console.log(`Start: ${event.dtStart}`);
//       console.log(`End: ${event.dtEnd}`);
//       console.log(`Description: ${event.description}`);
//       console.log('-------');
//     });
//   });
// });









