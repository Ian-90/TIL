"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person = {
    name: "Ian",
    age: 22,
    gender: "male"
};
const sayHi = (person) => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!`;
};
console.log(sayHi(person));
//# sourceMappingURL=index.js.map