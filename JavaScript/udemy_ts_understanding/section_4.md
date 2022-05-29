## 1. 클래스
* 클래스란?
  * 객체 지향 프로그래밍(OOP)
    * 실제 개체(entity)로 작업. 객체를 entity와 최대한 비슷하게 작업

  * Object
    * 코드로 작업을 수행하면서 사용할 수 있는 구체적인 요소들, 데이터를 저장하고 메소드를 실행하기 위해 메소드를 저장하는데 사용하는 데이터 구조

  * Class
    * 객체 지향 방법으로 객체를 구성하면서 앱이나 애플리케이션 로직을 관리하는 객체
    * 객체의 청사진
    * Instance - Class를 사용하여 객체의 형태, 포함해야 하는 데이터, 객체를 쉽게 만들기 위한 메소드 정의
    * Class를 이용하여 동일한 구조, 동일한 메소드로 여러 객체를 빠르게 복제 가능
    * 제어자 - `public`, `private`, `readonly`이며 자바스크립트에서는 인식을 할 수 없다. 
    ```ts
    class Department {
      // private id: string;
      // private name: string = 'DEFAULT';
      // private - 생성된 객체 내부에서만 접근할 수 있도록 설정
      private employees: string[] = [];
      // 접근 제어자
      constructor(private readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
      }
      // this 인자는 타입스크립트가 이해 할 수 있는 특별한 매개변수
      describe(this: Department) {
        console.log(`Department(${this.id}): ${this.name}`)
      }
    
      addEmployee(employee: string) {
        this.id = 'd2' // 읽기전용이므로 에러가 난다
        this.employees.push(employee)
      }
    
      printEmployeeInformation() {
        console.log(this.employees)
      }
    }

    const accounting = new Department('d1', 'Accounting')

    accounting.addEmployee('Max')
    accounting.addEmployee('Manu')
    accounting.employees[2] = 'Anna'

    accounting.describe()
    accounting.printEmployeeInformation()

    const accountingCopy = {
      describe: accounting.describe
    }

    accountingCopy.describe() // this인자 때문에 typescript에서 에러를 낸다.
    ```

## 2. 상속
```ts
class Department {
  protected employees: string[] = []; // 외부에서는 접근이 불가능하지만, 이 클래스를 확장한 모든 클래스에서는 접근 가능. private는 안됨
  constructor(private readonly id: string, public name: string) {
  }

  describe(this: Department) {
    console.log(`Department(${this.id}): ${this.name}`)
  }

  addEmployee(employee: string) {
    this.id = 'd2'
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    this.admins = admins 
  }

  describe() {
    console.log(`IT Department - ID: ${this.id}`)
  }
}

const it = new ITDepartment('d1', ['Max'])
it.printEmployeeInformation()

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
  }
  // 메소드를 오버라이딩
  addEmployee(name: string) {
    if (name === 'Max') {
      return
    }
  
    this.employoees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
  }

  printReports() {
    console.log(this.reports)
  }

  describe
}

const accounting = new Accounting('d2', [])
accounting.addReport('Something went wrong...')
accounting.addEmployee('Manu')
accounting.printReports()
```

## 3. getter, setter, static, abstract
* getter - 값을 가지고 올 때 함수나 메소드를 실행하는 속성
* setter - 값을 설정할 때 함수나 메소드를 실행하는 속성
* static - 클래스 인스턴스에서 접근할 수 없는 속성과 메소드를 클래스에 추가. 그룹화와 네임스페이스와 같은 기능을 함(ex. 자바스크립트의 Math 객체)
* abstract - 구체적인 값, 구체적인 구현을 기본 클래스가 제공하지 않고, 상속하는 클래스가 이를 수행
```ts
class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
  
    throw new Error('No report found...')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(value)
  }
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }
  // 메소드를 오버라이딩
  addEmployee(name: string) {
    if (name === 'Max') {
      return
    }
  
    this.employoees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

const accounting = new Accounting('d2', [])
// setter
accounting.moseRecentReport = ''
// getter, 속성으로 접근하지만, 정의된 것은 메소드
console.log(accounting.mostRecentReport)

abstract class Department {
  static ficalYear = 2020
  protected employees: string[] = [];
  constructor(private readonly id: string, public name: string) {
    console.log(Department.ficalYear)
  }

  static createEmployee(name) {
    return { name }
  }

  abstract describe(this: Department): void

  addEmployee(employee: string) {
    this.id = 'd2'
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees)
  }
}

const employee1 = Department.createEmployee('Max')
console.log(employee1, Department.ficalYear) // { name: 'Max' }, 2020

```

## 4. singleton
* 싱글턴 패턴
  * 특정 클래스의 인스턴스를 정확히 하나만 갖도록 하는 것.
  * 정적 메소드나 속성을 사용할 수 없거나, 클래스를 기반으로 여러 객체를 만들 수 없지만 정확히 하나의 객체만 가질 수 있도록 하고자 하는 경우 유용

* private 생성자를 이용
  ```ts
  class AccountingDepartment extends Department {
    ...
    private static instance: AccountingDepartment
    private constructor(id: string, private reports: string[]) {
      super(id, 'Accounting')
      this.lastReport = reports[0]
    }

    static getInstance() {
      if (AccountingDepartment.instance) {
        return this.instance
      }
      this.instance = new AccountingDepartment('d2', [])
      return this.instance
    }
    ...
  }

  const accounting =  AccountingDepartment.getInstance()
  const accounting2 =  AccountingDepartment.getInstance()
  console.log(accounting, accounting2)
  ```

## 5. interface
* interface
  * 객체의 구조를 설명
  * 첫글자는 대문자로 하는 것이 관례
  ```ts
  interface Greetable {
    readonly name?: string;

    greet(phrase: string): void
  }

  class Person implements Greetable {
    readonly name?: string;

    constructor(n: string) {
      if (n) {
        this.name = n
      }
    }

    greet(phrase: string) {
      if (this.name) {
        console.log(`${phrase} ${this.name}`)
      } e;se {
        console.log('Hello')
      }
    }
  }

  let user1: Greetable;
  user1 = new Person('Max')
  user1.name = 'hello' // readonly이기 때문에 error
  user.greet('Hello World')
  ```

* interface vs type
  * 서로 완전히 같지는 않다.
  * 인터페이스는 객체의 구조를 설명하기 위해서 사용하며, 서로 다른 클래스 사이에 기능을 공유하기 위해서도 사용
  * 타입은 좀 더 유연하지만 인터페이스가 더 깔끔하다.

* interface 상속
  ```ts
  interface Named {
    readonly name: string;
    outputName?: string; // optional property
  }

  interface Greetable extends Named {
    greet(phrase: string): void;
  }
  ```

* 함수 타입
  ```ts
  // type AddFn = (a: number, b: number) => number
  interface AddFn {
    (a: numbber, b: number): number
  }

  let add: AddFn;
  add = (n1: number, n2: number) => n1 + n2
  ```
