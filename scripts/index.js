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

const addEvent = async (uid, date, startHour, endHour, summary, description) => {
    let newEvent = {
        uid: uid,
        date: date,
        startHour: startHour,
        endHour: endHour,
        summary: summary,
        description: description,
    };
    items.push(newEvent);

    const response = await fetch('../events.json');
    const events = await response.json();

    events.push(newEvent);

    await fetch('../events.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(events),
    });

    return items;
} //add events to items

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
}; //prints all events into log

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
        dayEventsContainer.id = `${year}${month+1}${day < 10 ? "0" + day : day}`;

        dayRaster.appendChild(dayHeader)
        dayRaster.appendChild(dayEventsContainer)


        if (isCurrentMonth && day === currentDate) {
            dayRaster.classList.add("today-highlight"); // Add highlight class
        }
        calendar.appendChild(dayRaster);
    }

    fetch("../events.json").then(e => e.json()).then(d => {
        d.forEach(e => {
            const x = document.getElementById(e.date);
            console.log(x)
            // Create the event element
            const eventDiv = createElement('div', 'event');
            const eventTime = createElement('div', 'event-time', `${e.startHour} - ${e.endHour}`);
            const eventSummary = createElement('div', 'event-summary', e.summary);

            eventDiv.appendChild(eventTime);
            eventDiv.appendChild(eventSummary);

            // Append the event to the correct day's event container
            x.appendChild(eventDiv);
        })
    });
}
generateCalendar(); // Default is current date, optional parameters are (year, month (0 indexed))

document.querySelectorAll('.day-events-container').forEach(dayEventContainer => {
    dayEventContainer.addEventListener('click', () => {
        console.log("clicked day")
    });
});


document.querySelectorAll('.add-event-button').forEach(button => {
    button.addEventListener('click', async() => {
        const dateSelected = button.parentElement.querySelector('.day-date').textContent;
        const dayContainer = button.parentElement.parentElement.querySelector('.day-events-container');

        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        const startTime = prompt("Enter start time in HH:MM format (e.g., 13:00):");
        if (!startTime) return; // Exit if 'Cancel' is pressed

        const endTime = prompt("Enter end time in HH:MM format (e.g., 15:00):");
        if (!endTime) return;

        const summary = prompt("Enter event summary:");
        if (!summary) return;

        const description = prompt("Enter event description:");
        if (!description) return;

        // Add the event to the `items` array
        const formattedDate = `${String(year)}${String(month + 1).padStart(2, '0')}${String(dateSelected).padStart(2, '0')}`;
        await addEvent(
            `UID${Date.now()}`,
            formattedDate,
            startTime.split(':').join(''),
            endTime.split(':').join(''),
            summary,
            description
        );

        // Create the event element
        const eventDiv = createElement('div', 'event');
        const eventTime = createElement('div', 'event-time', `${startTime} - ${endTime}`);
        const eventSummary = createElement('div', 'event-summary', summary);

        eventDiv.appendChild(eventTime);
        eventDiv.appendChild(eventSummary);

        // Append the event to the correct day's event container
        dayContainer.appendChild(eventDiv);
    });
}); //add event listener to the add event button









