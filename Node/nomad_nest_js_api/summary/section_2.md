## 1. Overview
* src/main.ts - 필수파일
* 데코레이터 - 클래스에 함수 기능을 추가 할 수 있다.
* 모듈 -> 컨트롤러 -> 서비스 순으로 탐색해봄

## 2. Controllers
* AppModule - root 역할
* 컨트롤러 - url을 가져오고, 함수를 실행. express의 라우터 같음
```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // express의 get 라우터 역할
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

## 3. Services
* 서비스 - 비지니스 로직을 구분하기 위해 필요
* app.service.ts
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHi(): string {
    return 'Hi Nest'
  }
}
```

* app.controller.ts
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
}
```