## 1. Intersection Types
```ts
type Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric
```

## 2. Type Guards
```ts
function add(ad: Combinable, b: Combinable) {
  // type guard
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

type UnkonwEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`)

  if ('privileges' in emp) {
    console.log(`Privileges: ${emp.prvileges}`)
  }

  if ('startDate' in emp) {
    console.log(`Start Date: ${emp.startDate}`)
  }
}

class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ... ${amount}`)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1)
useVehicle(v2)
```

## 3. Discriminated Unions
```ts
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}


interface Horse {
  type: 'horse';
  runningSpeed: number;
}


type Animal = Bird & Horse

function moveAnimal(animal: Animal) {
  let speed
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log(`Moving with speed: ${speed}`)
}

moveAnimal({ type: 'bird', flyingSpeed: 10 })
```

## 4. Type Casting
```ts
// 둘 다 같은 문법이며, 프로젝트 내에서 일관성 있게 사용하는 것이 좋다.
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!
const userInputElement = document.getElementById('user-input')! as HTMLInputElement

userInputElement.value = 'Hi there!' // value 속성을 가졌다는것을 알려주기 위함

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a character'
}
```

## 5. Function Overloads
```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type guard
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const result = add(1, 5)
```

## 6. Optional Chaining & Null
```ts
const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  // job: {
  //   title: 'CEO',
  //   description: 'My own company',
  // },
}

console.log(fetchedUserData.job && fetchedUserData.job.title)
console.log(fetchedUserData?.job?.title)

const userInput = null
const storeDate = userInput ?? 'DEFAULT'
```
