function permuteString(str, prefix = "", results = []) {
    if (str.length === 0) {
      results.push(prefix);
      return results;
    }
  
    const used = new Set(); // prevents duplicate branching
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
  
      if (used.has(char)) continue; // skip duplicates
      used.add(char);
  
      const remaining = str.slice(0, i) + str.slice(i + 1);
      permuteString(remaining, prefix + char, results);
    }
  
    return results;
  }