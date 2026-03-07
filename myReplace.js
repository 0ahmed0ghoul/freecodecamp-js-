function myReplace(str, before, after) {
    // Check if the first letter of "before" is uppercase
    if (before[0] === before[0].toUpperCase()) {
      // Capitalize first letter of "after"
      after = after[0].toUpperCase() + after.slice(1);
    } else {
      // Ensure "after" starts lowercase
      after = after[0].toLowerCase() + after.slice(1);
    }
  
    return str.replace(before, after);
  }