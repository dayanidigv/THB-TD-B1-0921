function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


console.log(isValidEmail("test@gmail.com")); // true
console.log(isValidEmail("test@")); // false
console.log(isValidEmail("test@gmnailcom")); 
console.log(isValidEmail("test@ksrce.ac.in")); 
console.log(isValidEmail("test@daya@gemail.com")); 


const paragraph =
  "Node.js is used daya@gmail.com to build backend, call me 9677724053 APIs. Email: test.user@gmail.com. Phone: +91-9876543210.";



// 1. Match any word
const wordRegex = /\b\w+\b/g;
console.log(paragraph.match(wordRegex));

// 2. Match email
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
console.log(paragraph.match(emailRegex));

// 3. Match phone number (simple)
const phoneRegex = /\+?\d{1,3}[-\s]?\d{10}/g;
console.log(paragraph.match(phoneRegex));

// 4. Match all numbers
const numberRegex = /\d+/g;
console.log(paragraph.match(numberRegex));

// 5. Match specific word
const nodeRegex = /Node\.js/g;
console.log(paragraph.match(nodeRegex));

