## 1. Decorator
```ts
// Decorator 함수는 함수명이 보통 대문자로 시작
function Logger(constructor: Function) {
  console.log('Logging...')
  console.log(constructor)
}
// 클래스 decorator
@Logger // 실체화되기전 클래스가 정의만 되어도 실행된다
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new Person()

console.log(pers)
```
* tsconfig.json - decorator를 사용할 수 있도록 설정 추가
  ```json
  {
    "compilerOptions": {
      ...,
      "target": "es5",
      "experimentalDecorators": true
    }
  }
  ```

* 자바스크립트에서 class 및 constructor의 함수 정의만 입력되면 decorator가 실행된다. constructor 함수가 대상을 실체화하지 않았을 때도 실행된다.

## 2. Decorator 유형
* decorator factory - 어떤 대상에 decorator를 할당 할 떄 설정할 수 있도록 해주는 것. 내부 반환 decorator 함수로 대체되기 떄문에 값을 건너 뛸 수 있다는 것이 장점이다.
* 메타데이터를 더하거나 데이터를 복원할 때 decorator를 사용. 보이지 않게 추가 기능을 더 할수 있다
  ```ts
  function Logger(logString: string) {
    console.log('LOGGER FACTORY')
    return function(constructor: Function) {
      console.log(logString)
      console.log(constructor)
    }
  }
  // 클래스 decorator 및 class 반환
  function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY')
    return function<T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super()
          console.log('Rendering template')
          const hookEl = document.getElementById(hookId)
          const p = new originalConstructor()
          if (hookEl) {
            hookEl.innerHTML = template
            hookEl.querySelector('h1')!.textContent = this.name
          }
        }
      }
    }
  }
  /*
    실제 decorator의 함수의 실행은 밑에서부터 실행된다.
  */
  @Logger('LOGGING - PERSON')
  @WithTemplate('<h1>My Person Object</h1>', 'app')
  class Person {
    name = 'Max';

    constructor() {
      console.log('Creating person object...')
    }
  }
  // 속성 decorator
  function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!')
    console.log(target, propertyName)
  }
  // 접근자 decorator
  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
  }

  // 메소드 decorator
  function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
  }

  // 매개변수 decorator
  function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!')
    console.log(target)
    console.log(name)
    console.log(position) 
  }

  class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val
      } else {
        throw new Error('Invalid price should be positive!')
      }
    }
    constructor(t: string, p: number) {
      this.title = t
      this._price = p
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
      return this._price * (1 + tax)
    }
  }

  const p1 = new Product('Book', 19)
  const p2 = new Product('Book2', 29)
  ```

## 3. Decorator Examples들을 통해 알아보는 유용함
* autobind decorator
  * index.html
    ```html
    <button>Click me</button>
    ```
  
  * app.js
    ```ts
    function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value
      const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        emerable: false,
        get() {
          const boundFn = originalMethod.bind(this)
          return boundFn
        }
      }
      return adjDescriptor
    }


    class Printer {
      message = 'This works!'

      @Autobind
      showMessage() {
        console.log(this.message)
      }
    }

    const p = new Printer()
    const button = document.querySelector('button')!
    // decorator 없이 자바스크립트로 하는 바인딩
    // button.addEventListener('click', p.showMessage.bind(p))
    // descrator를 이용한 바인딩
    button.addEventListener('click', p.showMessage)
    ```
  
* validation decorator
  * index.html
    ```html
    <form>
      <input type="text" placeholder="Course title" id="title">
      <input type="text" placeholder="Course price" id="price">
      <button type="submit">Save</button>
    </form>
    ```

  * app.ts
    ```ts
    interface ValidatorConfig {
      [property: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
      }
    }

    const registeredValidators: ValidatorConfig = {}

    function Required(target: any, propName: string) {
      registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
      } 
    }

    function PositiveNumber(target: any, propName: string) {
      registeredvalidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']

      } 
    }

    function validate(obj: any) {
      const objValidatorConfig = registeredValidators[obj.constructor.name]
      if (!objValidatorConfig) {
        return true
      }
      let isValid = true
      for (const prop in objValidatorConfig) {
        console.log(prop)
        for (const validator of objValidatorConfig[prop]) {
          switch (validator) {
            case: 'required':
              isValid = isValid && !!obj[prop]
              break;
            case: 'positive':
              isValid = isValid && obj[prop] > 0
              break;
          }
        }
      }
      return isValid
    }


    class Course {
      @Required
      title: string;
      @PositiveNumber
      price: number;
    
      constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
      }
    }

    const courseForm = document.querySelect('form')!
    courseForm.addEventListener('submit', e => {
      e.preventDefault()
      const titleEl = document.getElementById('title') as HTMLInputElement
      const priceEl = document.getElementById('price') as HTMLInputElement
  
      const title = titleEl.value
      const price = +priceEl.value

      const createdCourse = new Course(title, price)

      if (!validate(createdCourse)) {
        alert('Invalid input, please try again!')
        return
      }
      console.log(createdCourse)
    })
    ```
    