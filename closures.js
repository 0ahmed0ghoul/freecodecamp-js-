// A closure is the combination of a function and its lexical scope. In other words,
//  a closure is a function defined in another function that remembers its lexical environment.

function parentFunction() {
  let x = 3;

  function childFunction(y) {
    return x + y;
  }

  return childFunction;
}

let res = parentFunction();

console.log(res(6));
