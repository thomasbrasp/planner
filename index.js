"use strict";
/*
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FLACKEYBUSINESS//PLANNER//EN

BEGIN:VTIMEZONE
TZID:Europe/Brussels

//dayligh saving time
BEGIN:DAYLIGHT
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
END:VTIMEZONE

BEGIN:VEVENT
UID:123456789@myapp.com //unique id
DTSTART:16010101T030000 //creation date, this gets changed when file gets updated to current time
YYYY MM DD HH MM SS
DTSTART:20241209T150000Z Z = timezone
YYYY MM DD HH MM SS
DTEND:20241209T160000
SUMMARY:Team Meeting //title item
DESCRIPTION:Meeting is about something //description item
END:VEVENT

END:VCALENDAR
*/

/*
DATETIME FORMAT
    //2024 12 16 T13 00 00
    //The most common representation of date and time is a tz timestamp such as 20010911T124640Z with the format
    // <year (4 digits)><month (2)><day (2)>T<hour (2)><minute (2)><second (2)>Z
    // for a total fixed length of 16 characters.
*
*/

// const calendar = {
//     version: "2.0", prodId: "-//Flackey//Planner//NL", timezones: [{
//         tzid: "Europe/Brussels", daylight: {
//             tzName: "CEST",
//             tzOffsetFrom: "+0100",
//             tzOffsetTo: "+0200",
//             dtStart: "19700329T020000",
//             rule: "FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU"
//         }, standard: {
//             tzName: "CET",
//             tzOffsetFrom: "+0200",
//             tzOffsetTo: "+0100",
//             dtStart: "19701025T030000",
//             rule: "FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU"
//         }
//     }],
// };
const items = [];
const addEvent = (uid, creationDate, dtStart, dtEnd, summary, description) => {
    let newEvent = {
        uid: uid,
        creationDate: creationDate,
        dtStart: dtStart,
        dtEnd: dtEnd,
        summary: summary,
        description: description,
    };
    items.push(newEvent);
    return items;
}

// Adding events
addEvent("C03A2C8A", "20241209T142933Z", "20241216T130000", "20241216T160000", "Webtechnologie PRO", "Lecture on web technology.");
addEvent("5384E8FB", "20241002T211905Z", "20241221T090000", "20241001T110000", "IT Organisatie PRO", "Discussion on IT organization principles.");
addEvent("26E609FC", "20241002T211905Z", "20241211T110000", "20241001T130000", "IT Essentials PRO", "Core topics of IT essentials.");
addEvent("A86F13FC", "20241002T211905Z", "20241218T140000", "20241001T160000", "Basis programmeren", "Introduction to basic programming concepts.");
addEvent("D9961AFC", "20241002T211905Z", "20241219T160000", "20241001T180000", "Databanken PRO", "Advanced database systems lecture.");

// Function to print all values of items
const printEvents = () => {
    items.forEach(event => {
        console.log(`UID: ${event.uid}`);
        console.log(`Creation Date: ${event.creationDate}`);
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

const appendEvent = () => {
    Array.from(items).forEach(item => {
        // 20241216T130000
        let day = item.dtStart.slice(6,8);
        if (day < 10){
            day.replace(0, "")
        }
        console.log(day)
    });
};


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
        dayDiv.textContent = day;
        calendar.appendChild(dayDiv);
    }

}
// Example: Generate December 2024 calendar
generateCalendar(2024, 11); // Month is 0-indexed (11 = December)

document.querySelectorAll('.day').forEach(day => {
    day.addEventListener('click', () => console.log(day.textContent));
});




















