"use strict";

const items = [];
const headersWeekDays = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];


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
    printEvents();

    return items;
} //add events to items

const printEvents = () => {
    console.clear();
    console.log(JSON.stringify(items));

    // Use Clipboard API only if the document is focused
    if (document.hasFocus()) {
        navigator.clipboard.writeText(JSON.stringify(items)).catch(err => {
            console.error('Failed to write to clipboard:', err);
        });
    } else {
        console.warn('Clipboard write skipped because the document is not focused.');
    }
};

const fetchItems = async () => {
    const e = await fetch("../events.json");
    const d = await e.json();

    d.forEach(e => {
        items.push(e);
    });
}

const fillCalender = () => {

    document.querySelectorAll('.day-events-container').forEach(container => {
        container.innerHTML = ""; // Fully clear each container
    });
    items.sort((a, b) => a.startHour.localeCompare(b.startHour)).forEach(item => {
        const x = document.getElementById(item.date);
        if (!x) {
            return;
        }
        console.log(x)
        // Create the event element

        const eventDiv = createElement('div', 'event');
        eventDiv.id = item.uid;
        const eventTime = createElement('div', 'event-time');
        const eventStartHour = createElement('div', 'event-startHour', item.startHour);
        eventStartHour.id = item.uid + '-start';
        const eventEndHour = createElement('div', 'event-endHour', item.endHour);
        eventEndHour.id = item.uid + '-end';
        eventTime.appendChild(eventStartHour);
        const span = createElement('span')
        span.innerHTML = `:`
        eventTime.appendChild(span);

        eventTime.appendChild(eventEndHour);

        const eventSummary = createElement('div', 'event-summary', item.summary);
        eventSummary.id = item.uid + '-summary';


        eventDiv.appendChild(eventTime);
        eventDiv.appendChild(eventSummary);

        // Append the event to the correct day's event container
        x.appendChild(eventDiv);


        eventStartHour.addEventListener('click', e => {
            const event = items.find(item => item.uid + '-start' === e.target.id);
            if (!event) return; // Ensure the event exists
            const newStartHour = prompt(`Change start time from ${event.startHour} to:`);

            if (newStartHour !== null && newStartHour.trim() !== '') { // Check if a value is provided
                const index = items.indexOf(event);
                event.startHour = newStartHour;
                items[index] = event;
                fillCalender();
            }
        });
        eventEndHour.addEventListener('click', e => {
            const event = items.find(item => item.uid + '-end' === e.target.id);
            if (!event) return; // Ensure the event exists
            const newEndHour = prompt(`Change end time from ${event.endHour} to:`);

            if (newEndHour !== null && newEndHour.trim() !== '') { // Check if a value is provided
                const index = items.indexOf(event);
                event.endHour = newEndHour;
                items[index] = event;
                fillCalender();
            }
        });

        eventSummary.addEventListener('click', e => {
            const event = items.find(item => item.uid + '-summary' === e.target.id);
            if (!event) return; // Ensure the event exists
            const newSummary = prompt(`Change summary from ${event.summary} to:`);

            if (newSummary !== null && newSummary.trim() !== '') { // Check if a value is provided
                const index = items.indexOf(event);
                event.summary = newSummary;
                items[index] = event;
                fillCalender();
            }
        });

        printEvents();

    })
}

const generateCalendar = async (year = new Date().getFullYear(), month = new Date().getMonth()) => {

    //CLEAR PREVIOUS CONTENT + WRITE HEADER + LOGICAL PART OF GETTING THE AMOUNT OF DAYS RIGHT
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = ""; // Clear any previous content


// Add buttons for navigating the calendar
    const navigationContainer = createElement('div', 'navigation-container');

// Create "Previous Month" button
    const prevButton = createElement('button', 'prev-button', '←');
    prevButton.id = 'prev-month';
    navigationContainer.appendChild(prevButton);

// Create "Next Month" button
    const nextButton = createElement('button', 'next-button', '→ Work in progress');
    nextButton.id = 'next-month';
    navigationContainer.appendChild(nextButton);

// Append navigation buttons to the calendar
    calendar.parentElement.insertBefore(navigationContainer, calendar);

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
        dayEventsContainer.id = `${year}${month + 1}${day < 10 ? "0" + day : day}`;

        dayRaster.appendChild(dayHeader)
        dayRaster.appendChild(dayEventsContainer)


        if (isCurrentMonth && day === currentDate) {
            dayRaster.classList.add("today-highlight"); // Add highlight class
        }
        calendar.appendChild(dayRaster);
    }
}
generateCalendar(2024, 11); // Default is current date, optional parameters are (year, month (0 indexed))
fetchItems().then(() => {
    fillCalender();
    addEventButton();
});

const createTimeInput = (labelText, idPrefix) => {
    const timeContainer = createElement('div', 'time-container');
    const label = createElement('label', '', labelText);

    const hourInput = createElement('input', `${idPrefix}-hour`);
    hourInput.type = 'text';
    hourInput.placeholder = 'HH';

    const hourDatalist = createElement('datalist', `${idPrefix}-hour-options`);
    hourDatalist.id = `${idPrefix}HourOptions`;
    for (let i = 0; i < 24; i++) {
        const hourOption = createElement('option', '', i.toString().padStart(2, '0'));
        hourDatalist.appendChild(hourOption);
    }
    hourInput.setAttribute('list', `${idPrefix}HourOptions`);

    const minuteInput = createElement('input', `${idPrefix}-minute`);
    minuteInput.type = 'text';
    minuteInput.placeholder = 'MM';

    const minuteDatalist = createElement('datalist', `${idPrefix}-minute-options`);
    minuteDatalist.id = `${idPrefix}MinuteOptions`;
    for (let i = 0; i < 60; i += 5) {
        const minuteOption = createElement('option', '', i.toString().padStart(2, '0'));
        minuteDatalist.appendChild(minuteOption);
    }
    minuteInput.setAttribute('list', `${idPrefix}MinuteOptions`);

    timeContainer.appendChild(label);
    timeContainer.appendChild(hourInput);
    timeContainer.appendChild(hourDatalist);
    timeContainer.appendChild(minuteInput);
    timeContainer.appendChild(minuteDatalist);

    return timeContainer;
};

const showFormContainer = () => {
    const formContainer = createElement('div', 'form-container');
    const formTitle = createElement('h3', '', 'Add Event');

    // Create input fields using the helper function
    const startTimeContainer = createTimeInput('Start', 'start');
    const endTimeContainer = createTimeInput('End', 'end');

    // Summary and Description Inputs
    const inputSummary = createElement('input', 'summary-form');
    inputSummary.type = 'text';
    inputSummary.placeholder = 'Summary';

    const inputDescription = createElement('textarea', 'description-form');
    inputDescription.placeholder = 'Description';

    // Submit and Close Buttons
    const submitButton = createElement('button', '', 'Submit');
    const closeButton = createElement('button', '', 'Close');

    closeButton.addEventListener('click', () => {
        document.body.removeChild(formContainer);
    });

    submitButton.addEventListener('click', () => {
        const startHour = startTimeContainer.querySelector('.start-hour').value.padStart(2, '0');
        const startMinute = startTimeContainer.querySelector('.start-minute').value.padStart(2, '0');
        const endHour = endTimeContainer.querySelector('.end-hour').value.padStart(2, '0');
        const endMinute = endTimeContainer.querySelector('.end-minute').value.padStart(2, '0');
        const summary = inputSummary.value;
        const description = inputDescription.value;

        if (startHour && startMinute && endHour && endMinute && summary) {
            const startTime = `${startHour}:${startMinute}`;
            const endTime = `${endHour}:${endMinute}`;
            console.log({ startTime, endTime, summary, description });
            document.body.removeChild(formContainer);
        } else {
            alert('Please fill in all required fields!');
        }
    });

    // Append elements to the form container
    formContainer.appendChild(formTitle);
    formContainer.appendChild(startTimeContainer);
    formContainer.appendChild(endTimeContainer);
    formContainer.appendChild(inputSummary);
    formContainer.appendChild(inputDescription);
    formContainer.appendChild(submitButton);
    formContainer.appendChild(closeButton);

    // Add form container to the body
    document.body.appendChild(formContainer);
};

document.querySelectorAll('.add-event-button').forEach(button => {
    button.addEventListener('click', showFormContainer);
});

const addEventButton = () => {
    document.querySelectorAll('.add-event-button').forEach(button => {
        button.addEventListener('click', () => {
            // Get the selected date
            const dateSelected = button.parentElement.querySelector('.day-date').textContent;
            const year = new Date().getFullYear();
            const month = new Date().getMonth();

            // Create the form container
            const formContainer = createElement('div', 'form-container');

            // Form title
            const formTitle = createElement('h3', '', 'Add Event');
            formContainer.appendChild(formTitle);

            // Start and End Time Inputs
            const startTimeContainer = createElement('div', 'time-container');
            const inputStartHour = createElement('input', 'start-hour');
            inputStartHour.type = 'text';
            inputStartHour.placeholder = 'HH';
            const datalistStartHour = createElement('datalist', 'start-hour-options');
            datalistStartHour.id = 'startHourOptions';
            for (let i = 0; i < 24; i++) {
                const hourOption = createElement('option', '', i.toString().padStart(2, '0'));
                datalistStartHour.appendChild(hourOption);
            }
            inputStartHour.setAttribute('list', 'startHourOptions');

            const inputStartMinute = createElement('input', 'start-minute');
            inputStartMinute.type = 'text';
            inputStartMinute.placeholder = 'MM';
            const datalistStartMinute = createElement('datalist', 'start-minute-options');
            datalistStartMinute.id = 'startMinuteOptions';
            for (let i = 0; i < 60; i += 5) {
                const minuteOption = createElement('option', '', i.toString().padStart(2, '0'));
                datalistStartMinute.appendChild(minuteOption);
            }
            inputStartMinute.setAttribute('list', 'startMinuteOptions');
            startTimeContainer.appendChild(createElement('label', '', 'Start:'));
            startTimeContainer.appendChild(inputStartHour);
            startTimeContainer.appendChild(datalistStartHour);
            startTimeContainer.appendChild(inputStartMinute);
            startTimeContainer.appendChild(datalistStartMinute);
            formContainer.appendChild(startTimeContainer);

            const endTimeContainer = createElement('div', 'time-container');
            const inputEndHour = createElement('input', 'end-hour');
            inputEndHour.type = 'text';
            inputEndHour.placeholder = 'HH';
            const datalistEndHour = createElement('datalist', 'end-hour-options');
            datalistEndHour.id = 'endHourOptions';
            for (let i = 0; i < 24; i++) {
                const hourOption = createElement('option', '', i.toString().padStart(2, '0'));
                datalistEndHour.appendChild(hourOption);
            }
            inputEndHour.setAttribute('list', 'endHourOptions');

            const inputEndMinute = createElement('input', 'end-minute');
            inputEndMinute.type = 'text';
            inputEndMinute.placeholder = 'MM';
            const datalistEndMinute = createElement('datalist', 'end-minute-options');
            datalistEndMinute.id = 'endMinuteOptions';
            for (let i = 0; i < 60; i += 5) {
                const minuteOption = createElement('option', '', i.toString().padStart(2, '0'));
                datalistEndMinute.appendChild(minuteOption);
            }
            inputEndMinute.setAttribute('list', 'endMinuteOptions');
            endTimeContainer.appendChild(createElement('label', '', 'End:'));
            endTimeContainer.appendChild(inputEndHour);
            endTimeContainer.appendChild(datalistEndHour);
            endTimeContainer.appendChild(inputEndMinute);
            endTimeContainer.appendChild(datalistEndMinute);
            formContainer.appendChild(endTimeContainer);

            // Summary and Description
            const inputSummary = createElement('input', 'summary-form');
            inputSummary.type = 'text';
            inputSummary.placeholder = 'Summary';
            formContainer.appendChild(inputSummary);

            const inputDescription = createElement('textarea', 'description-form');
            inputDescription.placeholder = 'Description';
            formContainer.appendChild(inputDescription);

            // Submit Button
            const submitButton = createElement('button', '', 'Submit');
            submitButton.addEventListener('click', () => {
                const startTime = `${inputStartHour.value}:${inputStartMinute.value}`;
                const endTime = `${inputEndHour.value}:${inputEndMinute.value}`;
                const summary = inputSummary.value;
                const description = inputDescription.value;

                // Validate inputs
                if (!inputStartHour.value || !inputStartMinute.value || !inputEndHour.value || !inputEndMinute.value || !summary) {
                    alert('Please fill in all required fields!');
                    return; // Exit if validation fails
                }

                // Create formatted date
                const formattedDate = `${year}${(month + 1).toString().padStart(2, '0')}${dateSelected.padStart(2, '0')}`;
                const uID = `UID${Date.now()}`;

                // Add event to the items array
                addEvent(uID, formattedDate, startTime.replace(':', ''), endTime.replace(':', ''), summary, description);

                // Refresh the calendar
                fillCalender();

                // Remove form from the DOM
                document.body.removeChild(formContainer);
            });

            formContainer.appendChild(submitButton);

            // Append the form container to the body
            document.body.appendChild(formContainer);
        });
    });
};























