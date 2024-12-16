"use strict";

const items = [];

function convertIcsToJavascript(timeString) {
  const YYYY = timeString.slice(0, 4);
  const MM = timeString.slice(4, 6);
  const DD = timeString.slice(6, 8);
  const hh = timeString.slice(9, 11);
  const mm = timeString.slice(11, 13);
  const ss = timeString.slice(13, 15);
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}`;
}

console.log(convertIcsToJavascript("20241216T130000"));

//for now I use these details, i will add full format conversion when everything works
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

// Adding events
addEvent("C03A2C8A", "20241216T130000", "20241216T160000", "Webtechnologie PRO", "Lecture on web technology.");
addEvent("5384E8FB", "20241221T090000", "20241221T110000", "IT Organisatie PRO", "Discussion on IT organization principles.");
addEvent("26E609FC", "20241211T110000", "20241211T130000", "IT Essentials PRO", "Core topics of IT essentials.");
addEvent("A86F13FC", "20241218T140000", "20241218T160000", "Basis programmeren", "Introduction to basic programming concepts.");
addEvent("D9961AFC", "20241219T160000", "20241219T180000", "Databanken PRO", "Advanced database systems lecture.");
const appendEvent = () => {
  Array.from(items).forEach(item => {
    // 20241216T130000
    let d = new Date();
    let day = item.dtStart.getDay();

    console.log(day)
  });
};

// Function to print all values of items
const printEvents = () => {
  items.forEach(event => {
    console.log(`Start Date: ${event.dtStart}`);
    console.log(`End Date: ${event.dtEnd}`);
    console.log(`Summary: ${event.summary}`);
    console.log(`Description: ${event.description}`);
    console.log('-------');
  });
};
// Print all events
printEvents();

const days = [];


const generateCalendar = (year, month) => {

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Clear any previous content

  // Days of the week headers
  const headers = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
  headers.forEach(day => {
    const headerDiv = document.createElement("header");
    headerDiv.classList.add('header');
    headerDiv.textContent = day;
    calendar.appendChild(headerDiv);
  });

  // Get the first day of the month and total days in the month
  const firstDay = new Date(year, month, 0).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add blank spaces for days before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.classList.add('filler');
    calendar.appendChild(blank);
  }

  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add('day');
    dayDiv.textContent = `${day}`;
    const addEventButton = document.createElement('div')
    addEventButton.classList.add('add-event-button');
    addEventButton.textContent = '+'
    dayDiv.appendChild(addEventButton)
    calendar.appendChild(dayDiv);
  }
}
// Example: Generate December 2024 calendar
generateCalendar(2024, 11); // Month is 0-indexed (11 = December)

document.querySelectorAll('.day').forEach(day => {
  day.addEventListener('click', () => console.log(day.textContent));
});


// Extend the existing generateCalendar function to append events to the rendered calendar with summary, start hour, and end hour.
const appendEventsToCalendar = () => {
  const dayCells = document.querySelectorAll('.day');

  dayCells.forEach((cell) => {
    const cellDay = parseInt(cell.textContent);

    items.forEach(event => {
      const eventDate = new Date(event.dtStart);
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();

      // Assuming the calendar is for a specific month and year.
      if (eventDay === cellDay && eventMonth === 11 && eventYear === 2024) { // Change month & year to your current calendar context
        const startTime = event.dtStart.split("T")[1].slice(0, 5); // Extract start hour
        const endTime = event.dtEnd.split("T")[1].slice(0, 5); // Extract end hour

        const eventDiv = document.createElement("div");
        eventDiv.classList.add('event');
        eventDiv.textContent = ` ${startTime}-${endTime}: ${event.summary}`;
        cell.appendChild(eventDiv);
      }
    });
  });
};

// Adding the call to appendEventsToCalendar after calendar generation
generateCalendar(2024, 11); // Month is 0-indexed (11 = December)
appendEventsToCalendar();

// Adding event listeners for days
document.querySelectorAll('.day').forEach(day => {
  day.addEventListener('click', () => console.log(day.textContent));
});

document.querySelectorAll('.day').forEach(day => {
  day.addEventListener('click', () => {
    const dateSelected = day.textContent;
    const year = 2024; // Update this as per your calendar's year context
    const month = 11;  // Update this as per your calendar's month context (11 = December)

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
      appendEventsToCalendar();
    }
  });
});

const day = document.querySelector('.day');
day.addEventListener('click', () => {
  const dateSelected = day.textContent;
  const year = 2024; // Update this as per your calendar's year context
  const month = 11;  // Update this as per your calendar's month context (11 = December)

  const eventsForDay = items.filter(event => {
    const eventDate = new Date(event.dtStart);
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.getMonth();
    const eventYear = eventDate.getFullYear();

    return eventDay === parseInt(dateSelected) && eventMonth === month && eventYear === year;
  });

  console.log(`Events for ${year}-${month + 1}-${dateSelected}:`);
  eventsForDay.forEach(event => {
    console.log(`Summary: ${event.summary}`);
    console.log(`Start: ${event.dtStart}`);
    console.log(`End: ${event.dtEnd}`);
    console.log(`Description: ${event.description}`);
    console.log('-------');
  });
});












