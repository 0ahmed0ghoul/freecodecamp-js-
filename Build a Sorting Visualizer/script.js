function generateElement(){
    return Math.floor(Math.random() * 100) + 1;
  } 
  
  function generateArray(){
    let arr = [];
    for (let i = 0; i < 5; i++){
      arr.push(generateElement());
    }
    return arr;
  }
  
  function generateContainer(){
    let div = document.createElement('div');
    return div;
  }
  
  function fillArrContainer(html, arr){
    html.innerHTML = '';
    for (let i = 0; i < arr.length; i++){
      html.innerHTML += `<span>${arr[i]}</span>`;
    }
  } 
  
  function isOrdered(int1, int2){
    return int1 <= int2;
  }
  
  function swapElements(arr, i){
    if (!isOrdered(arr[i], arr[i + 1])){
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }
  }
  
  function highlightCurrentEls(html, i) {
    const children = html.children;
    if (children[i]) {
      children[i].style.border = "2px dashed red";
    }
    if (children[i + 1]) {
      children[i + 1].style.border = "2px dashed red";
    }
  }
  
  const generateBtn = document.getElementById('generate-btn');
  const startingArray = document.getElementById('starting-array');
  const sortBtn = document.getElementById('sort-btn');
  const arrayContainer = document.getElementById('array-container');
  
  let currentArray = [];
  
  function clearExtraDivs() {
    const divs = arrayContainer.querySelectorAll('div:not(#starting-array)');
    divs.forEach(div => div.remove());
  }
  
  generateBtn.addEventListener('click', () => {
    currentArray = generateArray();
    fillArrContainer(startingArray, currentArray);
    clearExtraDivs();
    sortBtn.style.display = 'block';
  });
  
  sortBtn.addEventListener('click', () => {
    clearExtraDivs();
    sortBtn.style.display = 'none';
  
    let arr = [...currentArray];
  
    fillArrContainer(startingArray, arr);
    highlightCurrentEls(startingArray, 0);
  
    let steps = [];
    let swapped;
  
    do {
      swapped = false;
      for (let j = 0; j < arr.length - 1; j++) {
        if (!isOrdered(arr[j], arr[j + 1])) {
          swapElements(arr, j);
          swapped = true;
        }
        steps.push({ arr: [...arr], highlight: j + 1 });
      }
    } while (swapped);
  
    // Mark last step as sorted
    steps[steps.length - 1].isLast = true;
  
    steps.forEach(step => {
      let stepDiv = generateContainer();
      fillArrContainer(stepDiv, step.arr);
      if (step.isLast) {
        stepDiv.style.border = "3px solid green";
      } else {
        highlightCurrentEls(stepDiv, step.highlight);
      }
      arrayContainer.appendChild(stepDiv);
    });
  });