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































