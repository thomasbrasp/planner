"use strict";

const items = [];
const headersWeekDays = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
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

const addEvent = (uid, date, startHour, endHour, summary, description) => {
    let newEvent = {
        uid: uid,
        date: date,
        startHour: startHour,
        endHour: endHour,
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

    headersWeekDays.forEach(day => {
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
        console.log(`Date: ${event.date}`)
        console.log(`Start: ${event.startHour}`);
        console.log(`End: ${event.endHour}`);
        console.log(`Summary: ${event.summary}`);
        console.log(`Description: ${event.description}`);
        console.log("--------");
    });
};

// ADD EVENT BUTTON EVENT LISTENER
document.querySelectorAll('.add-event-button').forEach(button => {
    button.addEventListener('click', () => {
        const dateSelected = button.parentElement.querySelector('.day-date').textContent;

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
            const endTime = `${String(endHour).padStart(2, '0')}${String(startMinute).padStart(2, '0')}`;

            addEvent(
                `UID${Date.now()}`, // Generate a UID based on timestamp
                formattedDate, // Add date to the event object
                startTime.split(':').join(''), // Convert start time to HHMM format
                endTime.split(':').join(''), // Convert end time to HHMM format
                summary,
                description
            );

            // Re-render the calendar to include the new event
            printEvents();
            generateCalendar(year, month);
        }
    });
});









