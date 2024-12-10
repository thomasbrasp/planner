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
