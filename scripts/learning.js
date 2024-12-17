let myArray = []; // initialize an empty array
let myObject = { name: "John", age: 25 }; // create an object
myArray.push(myObject); // add the object to the array
console.log(myArray); // Output: [{ name: "John", age: 25 }]

// Convert the array to an object. Here, we'll use the first element's properties for demonstration.
let arrayToObject = myArray.reduce((obj, item) => {
    for (let key in item) {
        obj[key] = item[key];
    }
    return obj;
}, {});
console.log(arrayToObject); // Output: { name: "John", age: 25 }

const weekBox = document.getElementById('week-container');
const dayBoxes = document.getElementsByClassName('day-container');

// Attach a button to each dayBox
Array.from(dayBoxes).forEach(dayBox => {
    const button = document.createElement('button');
    button.textContent = 'Add Item';
    dayBox.appendChild(button);

    button.addEventListener('click', () => createItem(dayBox));
});

function createItem(container) {
    const newItem = document.createElement('div');
    newItem.textContent = 'New Item';
    container.appendChild(newItem);
}

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

// Adding events
addEvent("C03A2C8A", "20241216T130000", "20241216T160000", "Webtechnologie PRO", "Lecture on web technology.");
addEvent("5384E8FB", "20241221T090000", "20241221T110000", "IT Organisatie PRO", "Discussion on IT organization principles.");
addEvent("26E609FC", "20241211T110000", "20241211T130000", "IT Essentials PRO", "Core topics of IT essentials.");
addEvent("A86F13FC", "20241218T140000", "20241218T160000", "Basis programmeren", "Introduction to basic programming concepts.");
addEvent("D9961AFC", "20241219T160000", "20241219T180000", "Databanken PRO", "Advanced database systems lecture.");
printEvents();