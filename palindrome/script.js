const textInput = document.querySelector('#text-input');

const checkButton = document.getElementById('check-btn');

const result = document.getElementById('result');

checkButton.addEventListener('click',()=>{
  if (! textInput.value) alert('Please input a value');
  console.log(textInput.value)
  console.log(checkIfPalindrome(textInput.value))
  if(checkIfPalindrome(textInput.value)){ result.textContent = textInput.value+' is a palindrome' ;}else{
  result.textContent = textInput.value+' is not a palindrome'}
})

function checkIfPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  console.log(cleaned)

  // Reverse the cleaned string
  const reversed = cleaned.split("").reverse().join("");
  console.log(reversed)


  // Compare original cleaned string with reversed version
  return cleaned === reversed;
}