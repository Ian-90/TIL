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
