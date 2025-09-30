// Grouping Information Together

// Objects, key and value pairs

// {} -> its an object


// Information about a person
let person = {
    name: "John",
    age: 25,
    city: "New York"
};

// console.log("Name:", person.name);
// console.log("Name:", person["name"]); // alternative way to access
// console.log("Age:", person.age);
// console.log("City:", person.city);

// Information about a car
let car = {
    brand: "Toyota",
    color: "red",
    year: 2020
};

console.log("Car brand:", car.brand);
console.log("Car color:", car.color);

// Change information
person.age = 26;

console.log("New age:", person.age);

// More information groups
let student1 = {
     name: "Alice", grade: "A" 
};

let student2 = {
     name: "Bob", grade: "B" 
};

// console.log("Student 1:", student1.name, "Grade:", student1.grade);
// console.log("Student 2:", student2.name, "Grade:", student2.grade);

class Student{
    constructor(name, grade, age=18){
        this.name = name;
        this.grade = grade;
        this.age = age;
    }

    printInfo(){
        console.log(
            "Student:", this.name,
            "Grade:", this.grade,
            "Age:", this.age
        );
    }
}

let student3 = new Student("Charlie", "A+");

let student4 = new Student("Diana", "A");

let student5 = new Student("Eve", "B+");

console.log(typeof student1);
console.log(typeof student3);

// console.log("Student 3:", student3.name, "Grade:", student3.grade);
// console.log("Student 4:", student4.name, "Grade:", student4.grade);
// console.log("Student 5:", student5.name, "Grade:", student5.grade);

console.log("Student 3 new age:", student3.age);
student3.age = student3.age + 1;
console.log("Student 3 new age:", student3.age);


student3.printInfo();
console.log("-------------");
student4.printInfo();