## 1. Overview
* src/main.ts - 필수파일
* 데코레이터 - 클래스에 함수 기능을 추가 할 수 있다.
* 모듈 -> 컨트롤러 -> 서비스 순으로 탐색해봄

## 2. Controllers
* AppModule - root 역할
* 컨트롤러 - url을 가져오고, 함수를 실행. express의 라우터 같음
```js
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