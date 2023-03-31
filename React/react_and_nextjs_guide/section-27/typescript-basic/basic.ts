let age: number;

age = 12.1;

let userName: string;

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ["Sports", "Cooking"];

let person: {
  name: string;
  age: number;
};

person = {
  name: "Max",
  age: 32,
};

// Type inference

let course = "React - The Complete Guide";

course = 12345;

// Union type
let a: string | number;
a = "test";
a = 1;

// Type alias
type Person = {
  name: string;
  age: number;
  company: string;
};

let CPerson: Person = {
  name: "a",
  age: 1,
  company: "b",
};

// Functions & types

function add(a: number, b: number): number {
  return a + b;
}

function printOutput(value: any): void {
  console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array]
  return newArray
}

const demoArray = [1, 2, 3]

const updateArray = insertAtBeginning<number>(demoArray, -1) // [-1, 1, 2,  3]
const stringArray = insertAtBeginning<string>(['a', 'b', 'c'], 'd')

updateArray[0].split('')
