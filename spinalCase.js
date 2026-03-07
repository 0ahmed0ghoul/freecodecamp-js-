function spinalCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2") // add dash between lowercase & uppercase
      .replace(/[\s_]+/g, "-")             // replace spaces & underscores with dash
      .toLowerCase();                      // convert to lowercase
  }
  console.log(spinalCase('ProductLanding page'))