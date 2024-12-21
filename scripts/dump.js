// let myArray = []; // initialize an empty array
// let myObject = { name: "John", age: 25 }; // create an object
// myArray.push(myObject); // add the object to the array
// console.log(myArray); // Output: [{ name: "John", age: 25 }]
//
// // Convert the array to an object. Here, we'll use the first element's properties for demonstration.
// let arrayToObject = myArray.reduce((obj, item) => {
//     for (let key in item) {
//         obj[key] = item[key];
//     }
//     return obj;
// }, {});
// console.log(arrayToObject); // Output: { name: "John", age: 25 }
//
// const weekBox = document.getElementById('week-container');
// const dayBoxes = document.getElementsByClassName('day-container');
//
// // Attach a button to each dayBox
// Array.from(dayBoxes).forEach(dayBox => {
//     const button = document.createElement('button');
//     button.textContent = 'Add Item';
//     dayBox.appendChild(button);
//
//     button.addEventListener('click', () => createItem(dayBox));
// });
//
// function createItem(container) {
//     const newItem = document.createElement('div');
//     newItem.textContent = 'New Item';
//     container.appendChild(newItem);
// }
//
// /*
// BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//FLACKEYBUSINESS//PLANNER//EN
//
// BEGIN:VTIMEZONE
// TZID:Europe/Brussels
//
// //dayligh saving time
// BEGIN:DAYLIGHT
// TZNAME:CEST
// TZOFFSETFROM:+0100
// TZOFFSETTO:+0200
// DTSTART:19700329T020000
// RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
// END:DAYLIGHT
// BEGIN:STANDARD
// TZNAME:CET
// TZOFFSETFROM:+0200
// TZOFFSETTO:+0100
// DTSTART:19701025T030000
// RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
// END:STANDARD
// END:VTIMEZONE
// END:VTIMEZONE
//
// BEGIN:VEVENT
// UID:123456789@myapp.com //unique id
// DTSTART:16010101T030000 //creation date, this gets changed when file gets updated to current time
// YYYY MM DD HH MM SS
// DTSTART:20241209T150000Z Z = timezone
// YYYY MM DD HH MM SS
// DTEND:20241209T160000
// SUMMARY:Team Meeting //title item
// DESCRIPTION:Meeting is about something //description item
// END:VEVENT
//
// END:VCALENDAR
// */
//
// /*
// DATETIME FORMAT
//     //2024 12 16 T13 00 00
//     //The most common representation of date and time is a tz timestamp such as 20010911T124640Z with the format
//     // <year (4 digits)><month (2)><day (2)>T<hour (2)><minute (2)><second (2)>Z
//     // for a total fixed length of 16 characters.
// *
// */
//
// // const calendar = {
// //     version: "2.0", prodId: "-//Flackey//Planner//NL", timezones: [{
// //         tzid: "Europe/Brussels", daylight: {
// //             tzName: "CEST",
// //             tzOffsetFrom: "+0100",
// //             tzOffsetTo: "+0200",
// //             dtStart: "19700329T020000",
// //             rule: "FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU"
// //         }, standard: {
// //             tzName: "CET",
// //             tzOffsetFrom: "+0200",
// //             tzOffsetTo: "+0100",
// //             dtStart: "19701025T030000",
// //             rule: "FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU"
// //         }
// //     }],
// // };
//
// // Adding events
// addEvent("C03A2C8A", "20241216T130000", "20241216T160000", "Webtechnologie PRO", "Lecture on web technology.");
// addEvent("5384E8FB", "20241221T090000", "20241221T110000", "IT Organisatie PRO", "Discussion on IT organization principles.");
// addEvent("26E609FC", "20241211T110000", "20241211T130000", "IT Essentials PRO", "Core topics of IT essentials.");
// addEvent("A86F13FC", "20241218T140000", "20241218T160000", "Basis programmeren", "Introduction to basic programming concepts.");
// addEvent("D9961AFC", "20241219T160000", "20241219T180000", "Databanken PRO", "Advanced database systems lecture.");
// printEvents();
//
// // ADD EVENT BUTTON EVENT LISTENER
// // document.querySelectorAll('.add-event-button').forEach(button => {
// //     button.addEventListener('click', () => {
// //         const dateSelected = button.parentElement.querySelector('.day-date').textContent;
// //
// //         const year = new Date().getFullYear();
// //         const month = new Date().getMonth();
// //
// //         const startTime = prompt("Enter start time in HH:MM format (e.g., 13:00):");
// //         if (startTime === null) {
// //             return; // Exit if 'Cancel' is pressed on the first prompt
// //         }
// //         const duration = prompt("Enter event duration in hours (e.g., 2):");
// //         if (duration === null) {
// //             return; // Exit if 'Cancel' is pressed on the second prompt
// //         }
// //         const summary = prompt("Enter event summary:");
// //         if (summary === null) {
// //             return; // Exit if 'Cancel' is pressed on the third prompt
// //         }
// //         const description = prompt("Enter event description:");
// //         if (description === null) {
// //             return; // Exit if 'Cancel' is pressed on the fourth prompt
// //         }
// //
// //         if (startTime && duration && summary && description) {
// //             const formattedDate = `${String(year)}${String(month + 1).padStart(2, '0')}${String(dateSelected).padStart(2, '0')}`;
// //
// //             // Calculate the end time
// //             const [startHour, startMinute] = startTime.split(':').map(num => parseInt(num, 10));
// //             const endHour = startHour + parseInt(duration, 10);
// //             const endTime = `${String(endHour).padStart(2, '0')}${String(startMinute).padStart(2, '0')}`;
// //
// //             addEvent(
// //                 `UID${Date.now()}`, // Generate a UID based on timestamp
// //                 formattedDate, // Add date to the event object
// //                 startTime.split(':').join(''), // Convert start time to HHMM format
// //                 endTime.split(':').join(''), // Convert end time to HHMM format
// //                 summary,
// //                 description
// //             );
// //
// //             // Re-render the calendar to include the new event
// //             printEvents();
// //             generateCalendar(year, month);
// //         }
// //     });
// // });
//
//
//
// const fetchItems = async () => {
//     const e = await fetch("../events.json");
//     const d = await e.json();
//
//     d.forEach(e => {
//         items.push(e);
//     });
// }
//
// const fillCalender = () => {
//     items.forEach(e => {
//         // Create the event element
//         const x = document.getElementById(e.date);
//         const eventDiv = createElement('div', 'event');
//         eventDiv.id = e.uid;
//         const eventTime = createElement('div', 'event-time', `${e.startHour} - ${e.endHour}`);
//         const eventSummary = createElement('div', 'event-summary', e.summary);
//
//         eventDiv.appendChild(eventTime);
//         eventDiv.appendChild(eventSummary);
//
//         // Append the event to the correct day's event container
//         x.appendChild(eventDiv);
//         eventDiv.addEventListener('click', async e => {
//             console.log(e.target.id);
//             const event = items.find(item => item.uid === e.target.id)
//             const index = items.indexOf(event)
//             console.log(event)
//             console.log(items)
//             console.log(e.target.id)
//             event.startHour = prompt("Enter start time in HH:MM format (e.g., 13:00):");
//             items[index] = event;
//             await generateCalendar();
//             fillCalender();
//         });
//     });
// }
// const fillCalender = () => {
//     items.forEach(e => {
//         // Create the event element
//         const x = document.getElementById(e.date);
//         const eventDiv = createElement('div', 'event');
//         eventDiv.id = e.uid;
//         const eventTime = createElement('div', 'event-time', `${e.startHour} - ${e.endHour}`);
//         const eventSummary = createElement('div', 'event-summary', e.summary);
//
//         eventDiv.appendChild(eventTime);
//         eventDiv.appendChild(eventSummary);
//
//         // Append the event to the correct day's event container
//         x.appendChild(eventDiv);
//         eventDiv.addEventListener('click', async e => {
//             console.log(e.target.id);
//             const event = items.find(item => item.uid === e.target.id)
//             const index = items.indexOf(event)
//             console.log(event)
//             console.log(items)
//             console.log(e.target.id)
//             event.startHour = prompt("Enter start time in HH:MM format (e.g., 13:00):");
//             items[index] = event;
//             await generateCalendar();
//             fillCalender();
//         });
//     });
// }







//an option to handle the form
// const showFormContainer = () => {
//     const formContainer = createElement('div', 'form-container');
//     const formTitle = createElement('h3', '', 'Add Event');
//
//     // Create custom dropdowns
//     const inputStartHour = createElement('select', '');
//     const inputStartMinute = createElement('select', '');
//     const inputEndHour = createElement('select', '');
//     const inputEndMinute = createElement('select', '');
//
//     // Populate dropdowns with 24-hour options
//     for (let i = 0; i < 24; i++) {
//         const hourOption = createElement('option', '', i.toString().padStart(2, '0'));
//         inputStartHour.appendChild(hourOption);
//         inputEndHour.appendChild(hourOption.cloneNode(true));
//     }
//     for (let i = 0; i < 60; i++) {
//         const minuteOption = createElement('option', '', i.toString().padStart(2, '0'));
//         inputStartMinute.appendChild(minuteOption);
//         inputEndMinute.appendChild(minuteOption.cloneNode(true));
//     }
//
//     const submitButton = createElement('button', '', 'Submit');
//     const closeButton = createElement('button', '', 'Close');
//
//     closeButton.addEventListener('click', () => {
//         document.body.removeChild(formContainer);
//     });
//
//     submitButton.addEventListener('click', () => {
//         const startTime = `${inputStartHour.value}:${inputStartMinute.value}`;
//         const endTime = `${inputEndHour.value}:${inputEndMinute.value}`;
//         console.log({ startTime, endTime });
//         document.body.removeChild(formContainer);
//     });
//     formContainer.appendChild(formTitle);
//     formContainer.appendChild(inputStartHour);
//     formContainer.appendChild(inputStartMinute);
//     formContainer.appendChild(inputEndHour);
//     formContainer.appendChild(inputEndMinute);
//     formContainer.appendChild(submitButton);
//     formContainer.appendChild(closeButton);
//     document.body.appendChild(formContainer);
// };

// /* Center the form container in the middle of the screen */
// .form-container {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: 1000; /* Ensure it appears above other elements */
//     width: 350px; /* Adjust width as needed */
//     padding: 20px;
//     background-color: white; /* Background color for the form */
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
//     border-radius: 8px; /* Rounded corners for a smooth appearance */
//     text-align: center; /* Center content inside the form */
//     border: 1px solid #ddd; /* Optional border for the form */
// }
//
// /* Form title styling */
// .form-container h3 {
//     margin-bottom: 20px; /* Space below the title */
//     font-size: 1.5em; /* Larger font size */
//     color: #333; /* Dark gray for better readability */
// }
//
// /* Styling for dropdowns */
// .form-container select {
//     width: 100px; /* Adjust width as needed */
//     margin: 5px; /* Add spacing between dropdowns */
//     padding: 8px; /* Add padding for clickable area */
//     border: 1px solid #ccc; /* Subtle border */
//     border-radius: 4px; /* Rounded corners */
//     background-color: #f9f9f9; /* Light background for contrast */
//     font-size: 1em; /* Adjust font size */
//     color: #333; /* Dark text for readability */
//     cursor: pointer; /* Pointer cursor on hover */
// }
//
// /* Styling for buttons */
// .form-container button {
//     margin: 10px 5px; /* Add spacing between buttons */
//     padding: 10px 15px; /* Padding for a comfortable clickable area */
//     border: none; /* Remove default border */
//     border-radius: 4px; /* Rounded corners for consistency */
//     background-color: #007bff; /* Blue background color */
//     color: white; /* White text for contrast */
//     font-size: 1em; /* Adjust font size */
//     cursor: pointer; /* Pointer cursor on hover */
// }
//
// /* Button hover effect */
// .form-container button:hover {
//     background-color: #0056b3; /* Darker blue on hover */
// }
//
// /* Optional: Add some responsiveness for smaller screens */
// @media (max-width: 500px) {
// .form-container {
//         width: 90%; /* Make the form width smaller on small screens */
//         padding: 15px; /* Reduce padding */
//     }
// .form-container select {
//         width: 80px; /* Adjust width for dropdowns */
//     }
// .form-container button {
//         width: 100%; /* Make buttons full width */
//         margin: 5px 0; /* Stack buttons vertically */
//     }
// }

//correct way
// const showFormContainer = () => {
//     // Create the form container
//     const formContainer = createElement('div', 'form-container');
//
//     // Add content inside the form
//     const formTitle = createElement('h3', '', 'Add Event');
//     const inputStartTime = createElement('input', 'start-time-form');
//     inputStartTime.type = 'time';
//     inputStartTime.placeholder = 'Start Time';
//
//     const inputEndTime = createElement('input', 'end-time-form');
//     inputEndTime.type = 'time';
//     inputEndTime.placeholder = 'End Time';
//
//     const inputSummary = createElement('input', 'summary-form');
//     inputSummary.type = 'text';
//     inputSummary.placeholder = 'Summary';
//
//     const inputDescription = createElement('textarea', 'description-form');
//     inputDescription.placeholder = 'Description';
//
//     const submitButton = createElement('button', '', 'Submit');
//     const closeButton = createElement('button', '', 'Close');
//
//     // Add event listeners for buttons
//     closeButton.addEventListener('click', () => {
//         document.body.removeChild(formContainer);
//     });
//
//     submitButton.addEventListener('click', () => {
//         const startTime = inputStartTime.value;
//         const endTime = inputEndTime.value;
//         const summary = inputSummary.value;
//         const description = inputDescription.value;
//
//         if (startTime && endTime && summary) {
//             // Process the event data here
//             console.log({ startTime, endTime, summary, description });
//
//             // Close the form container after submitting
//             document.body.removeChild(formContainer);
//         } else {
//             alert('Please fill in all required fields!');
//         }
//     });
//
//     // Append all inputs and buttons to the form container
//     formContainer.appendChild(formTitle);
//     formContainer.appendChild(inputStartTime);
//     formContainer.appendChild(inputEndTime);
//     formContainer.appendChild(inputSummary);
//     formContainer.appendChild(inputDescription);
//     formContainer.appendChild(submitButton);
//     formContainer.appendChild(closeButton);
//
//     // Append the form container to the body
//     document.body.appendChild(formContainer);
// };
//
// .form-container {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: 1000; /* Ensure it's above other elements */
//     width: 300px; /* Adjust width as needed */
//     padding: 20px;
//     background-color: white; /* Popup background color */
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for popup effect */
//     border-radius: 8px; /* Rounded corners */
//     text-align: center; /* Center content alignment */
//     border: 1px solid #ddd; /* Optional border */
// }
//
// .form-container input,
// .form-container textarea {
//     display: block;
//     width: 100%;
//     margin-bottom: 10px;
//     padding: 8px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// }
//
// .form-container button {
//     margin: 5px;
//     padding: 8px 12px;
//     border: none;
//     border-radius: 4px;
//     background-color: #007bff;
//     color: white;
//     cursor: pointer;
// }
//
// .form-container button:hover {
//     background-color: #0056b3;
// }


















