function addTogether(a, b) {
    const isNum = n => typeof n === "number";
    
    if (arguments.length === 2) {
      if (isNum(a) && isNum(b)) return a + b;
      return undefined;
    }
    
    if (isNum(a)) {
      return function(b) {
        if (isNum(b)) return a + b;
        return undefined;
      };
    }
    return undefined;
  }