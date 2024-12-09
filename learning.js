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