## TypScript와 함께 JavaScript 라이브러리 사용하기
* 자바스크립트로 빌드된 라이브러리들을 타입스크립트에서 사용하기 위해서는 타입 설치가 필요
  * DefinitelyTyped에서 타입 패키지를 설치하거나 `.d.ts`로 직접 구현

* 타입 패키지가 없을 경우
  * index.html 같은 곳에서 전역변수를 사용 할 떄 - declare로 타입 선언
    ```ts
    declare var GLOBAL: any;
    ```

* class-transformer
  * 설치
    ```
    yarn add class-transformer reflect-metadata
    ```

  * ex
    ```ts
    import 'reflect-metadata'
    import { plainToClass} from 'class-transformer'
  
    class Product {
      title: string;
      price: number;

      constructor(t: string. p: number) {
        this.title = t
        this.price = p
      }

      getInformation() {
        return [this.title, `$${this.price}`]
      }
    }
    // 서버에서 받은 데이터라고 가정
    const products = [
      { title: 'A Carpet', price: 30 },
      { title: 'A Book', price: 10 }
    ]

    // 수동으로 변환
    const loadedProducts = products.map(prod => {
      return new Product(prod.title, prod.price)
    })

    // class-transformer 이용
    const loadedProducts2 = plainToClass(Product, products)

    for (const prod of loadedProducts) {
      console.log(prod.getInformation())
    }
    ```

* class-validator
  * 설치
    ```
    yarn add class-validator
    ```

  * ex
    ```ts
    import { validate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
    import 'reflect-metadata'
    import { plainToClass} from 'class-transformer'
  
    class Product {
      @IsNotEmpty()
      title: string;
      @IsNumber()
      @IsPositivie()
      price: number;

      constructor(t: string. p: number) {
        this.title = t
        this.price = p
      }

      getInformation() {
        return [this.title, `$${this.price}`]
      }
    }

  const newProd = new Product('', -5)
  validate(newProd).then(err => {
    if (errors.length > 0) {
      console.log('VALIDATION ERRORS!', errors)
    } else {
      console.log(newProd.getInformation())
    }
  })
    ```