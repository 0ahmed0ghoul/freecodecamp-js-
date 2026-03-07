// 1️⃣ Initialize poll as a Map
let poll = new Map([
    ["Turkey", new Set(["traveler1", "traveler2"])],
    ["Morocco", new Set(["traveler3"])],
    ["Spain", new Set()]
  ]);
  
  // 2️⃣ Add Option
  function addOption(option) {
    if (!option) return "Option cannot be empty.";
  
    if (poll.has(option)) {
      return `Option "${option}" already exists.`;
    }
  
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
  }
  
  // 3️⃣ Vote
  function vote(option, voterId) {
    if (!poll.has(option)) {
      return `Option "${option}" does not exist.`;
    }
  
    const voters = poll.get(option);
  
    if (voters.has(voterId)) {
      return `Voter ${voterId} has already voted for "${option}".`;
    }
  
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
  }
  
  // 4️⃣ Display Results
  function displayResults() {
    let result = "Poll Results:\n";
  
    for (let [option, voters] of poll.entries()) {
      result += `${option}: ${voters.size} votes\n`;
    }
  
    return result.trim();
  }