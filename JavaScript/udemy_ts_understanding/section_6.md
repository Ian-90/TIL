## 1. Generic
* 제네릭 - 다른 타입과 연결되는 종류
  ```ts
  const names: Array<string> = ['Max', 'Manuel']
  const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is done!')
    }, 2000)
  })
  ```

## 2. Generic Functions & Classes
```ts
// function
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

console.log(merge({ name: 'Max' }, { age: 30 }))

const mergedObj = merge<{ name: string, hobbies: string[] }, { age: number }>({ name: 'Max', hobbies: ['Sports'] }, { age: 30 })

// classes
class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Max')
textStorage.addItem('Manu')
textStorage.removeItem('Max')
console.log(textStorage.getItems())

const objStorage = new DataStorage<object>()
const maxObj = { name: 'Max' }
objStorage.addItem(maxObj)
objStorage.addItem({ name: 'Manu'})
objStorage.removeItem(maxObj)
```

## 3. Constraints
* 제네릭 타입 제약조건 걸기 - `extends` 이용
  ```ts
  function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
  }

  const mergedobj2 = merge<{ name: string, hobbies: string[] }, { age: number }>({ name: 'max', hobbies: ['sports'] }, 30)

  mergedobj2.age // error

  interface Lengthy {
    length: number
  }
  // length 속성을 가져야하는 제네릭
  function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
      descriptionText = 'Got 1 element.'
    } else if (element.length > 1) {
      descriptionText = `Got ${element.length} elements.`
    }
    return [element, descriptionText]
  }

  console.log(countAndDescribe('Hi there!'))

  function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`
  }

  console.log(extractAndConvert({}, 'name'))
  ```

## 4. Special TypeScript Types
```ts
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Max', 'Anna']
names.push('Manu') // error
```

* Partial - 전체 모든 속성을 선택적인 타입으로 변경
* ReadOnly - 읽기전용
