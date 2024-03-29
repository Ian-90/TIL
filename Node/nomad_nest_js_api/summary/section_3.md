## 1. Movies Controller
* nest-cli로 컨트롤러 생성하기
```
nest generate controller
// 약어
nest g co

// nest-cli 로컬 설치했을 때
npx nest g co
```

* 라우팅
```ts
import { Controller, Get } from '@nestjs/common';

@Controller('movies') // 우리 url의 entry point를 컨트롤
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies'
  }

  @Get('/:id')
  getOne(@Param('id') id: string) { // 파라미터 사용
    return `This will return one movies with the id: ${id}`
  }

  @Post()
  create() {
    return 'This will create a moive'
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch a movie with the id: ${movieId}` 
  }
}
```

## 2. More Routes
* 필요한 값들은 `@Param`, `@Body`, `@Query`등등 인자에서 요청해야 한다.

## 3. Movies Service part One
* Service - 로직을 관리하는 역할
* 서비스 생성
```
nest g s
```
* 수업에선 가짜 데이터베이스 사용
* 서비스에 주입할 타입들은 entity 폴더에 작성
* 서비스를 생성하여 각 컨트롤러와 연동

## 4. Movies Service part Two
* 서비스 기능 마무리(delete, update)

## 5. DTOs and Validation part One
* DTO(Data Transfer Object) - 데이터 전송 객체
* class의 유효성 검사 - class-validator, class-transformer 설치
* 데이터 유효성 검증 - main.ts
```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // 아무 데코레이터도 없는 어떠한 프로퍼티의 오브젝트를 거른다
    forbidNonWhitelisted: true,
    transform: true, // 자동으로 request할 때마다 실제 데이터 타입으로 변환
  })
)
```

## 6. DTOs and Validation part Two
* @nestjs/mapped-types - 타입을 변환시키고 사용할 수 있게 하는 패키지
  * PartialType

## 7. Modules and Dependency Injection
* module 생성
```
nest g mo
```
* module 분리
* dependency injection - nestjs가 Service를 providers에 두면, Controller에 주입

## 8. Express on NestJS
* nestjs는 express위에서 돌아가기 때문에 req,res를 이용가능하다. 하지만 추천하지는 않는다
* nextjs는 fastify 위에서도 돌아간다
* fastify의 성능이 더좋아서 express에서 fastify로 전환시 이슈가 없으려면 nestjs용 방법을 사용해야 한다
