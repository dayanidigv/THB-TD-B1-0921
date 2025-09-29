var name = 'Hellow';

// + - * / %

// let c = a + b;

// console.log(c);

// c = a - b;

// console.log(c);

// c = a * b;

// console.log(c);

// c = a / b;

// console.log(c);

// c = a % b;

// console.log(c);

// ++ --

// var n = a++;

// console.log(a);

// console.log(n);

// n--;

// console.log(n);

// if, else

// var a = 10;
// var b = 10;

// console.log(typeof(a));
// console.log(typeof(b));

// if (a === b) {
//     // console.log( a + ' is equal to ' + b );
// } else {

//     // console.log(`${b} is greater than ${a}`);

//     // console.log( b + ' is greater than ' + a );

// }

// if, else if, else


// '>'is greater than
// '<' is less than
// '>=' is greater than or equal to
// '<=' is less than or equal to
// '==' is equal to (value only)
// '===' is equal to (value and type)
// '!=' is not equal to (value only)
// '!==' is not equal to (value and type)

// && is AND
// || is OR
// var my_age = 65;

// if (my_age < 18) {
//     console.log('You are a minor');
// } 

// else if (my_age == 18 && my_age <= 60) {
//     console.log('this is AND, You are an adult');
// }

// else if (my_age > 18 || my_age < 60) {
//     console.log('this is OR, You are an adult');
// }
// else {
//     console.log('You are a senior citizen');
// }

// switch

// var day = 10;
// var day_name = '';

// switch (day) {
//     case 1:
//         day_name = 'Monday';
//         break;
//     case 2:
//         day_name = 'Tuesday';
//         break;
//     case 3:
//         day_name = 'Wednesday';
//         break;
//     case 4:
//         day_name = 'Thursday';
//         break;
//     case 5:
//         day_name = 'Friday';
//         break;
//     case 6:
//         day_name = 'Saturday';
//         break;
//     case 7:
//         day_name = 'Sunday';
//         break;

//     default:
//         day_name = 'Invalid Day';
// }

// console.log(day_name);

// ---------------------------------------------------
// function

function greet(name, age) {
    console.log(`Hello ${name}, you are ${age} years old.`);
}

// greet(name="John", age=30);

// console.log(10 + 20 + 30);
// console.log(40 + 20 + 30);
// console.log(25 + 20 + 30);
// console.log(5 + 20 + 30);

function add(a, b, c) {
    if (typeof c === 'undefined') {
        c = 0;
    }
    return a + b + c;
}

function print_add(a, b=4) {
    if (typeof c === 'undefined') {
        c = 0;
    }
    console.log(a + b + c);
}

// var result = add(10, 20, 30);

// console.log(result);


// print_add(10, 20, 30);

// print_add(10, 20);

// print_add(10);




