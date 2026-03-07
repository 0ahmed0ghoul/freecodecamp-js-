// Hoisting in JavaScript refers to the process by which the JavaScript 
// interpreter moves the declaration of variables, 
// functions, classes, and imports to the top of the code before execution.


//Variable hoisting
console.log(x); // undefined

var x = 4;



var x;

console.log(x);

x = 4


console.log(y); // ReferenceError: Cannot access "y" before initialization

let y = 3;

//Function hoisting

// Functions are hoisted just like var-declared variables.


console.log(addNums(1,3)); // 4

function addNums(a,b){
return a + b;
}

// During execution, the code looks like this:

function addNums(a,b){
return a + b;
}

console.log(addNums(1,3));

// However, it's important to know that only function declarations are hoisted. 
// Function expressions are not hoisted.

console.log(addNums(1,3)); // ReferenceError: cannot access "addNums" before initialization

const addNums = function (a,b) {
return a + b;
}

// Class hoisting
// Unlike function declaration, class declarations are not hoisted. 
// This means you cannot accessed a class before its declaration.


new Car(); // ReferenceError: cannot access "Car" before initialization

class Car{}