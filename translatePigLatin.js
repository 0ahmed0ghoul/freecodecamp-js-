function translatePigLatin(str) {
    const vowelRegex = /[aeiou]/;
  
    // If word starts with vowel
    if (vowelRegex.test(str[0])) {
      return str + "way";
    }
  
    // Find index of first vowel
    const firstVowelIndex = str.search(vowelRegex);
  
    // If no vowels found
    if (firstVowelIndex === -1) {
      return str + "ay";
    }
  
    // Move consonant cluster to end + "ay"
    return str.slice(firstVowelIndex) +
           str.slice(0, firstVowelIndex) +
           "ay";
  }