# section 9. RESTful API

## 1. RESTful API 정의

### 간단한 개념

- REST

  - REST is an architecture style for desigining networked apllications
  - 데이터를 주고받을때, 스타일 또는 패턴이다.

- RESTfull API

  - HTTP Protocol 기반
  - 리소스는 URI로 표현하며, '고유'해야 한다.
  - URI는 단순하고 직관적인 구조
  - 리소스의 상태는 HTTP Methods를 활용하여 구분
  - xml/json을 활용하여 데이터 전송(주로 json은 사용)

- CRUD

  - 네트워크를 통해 웹 리소스를 다루기 위한 행위들.
  - Create(POST)
  - Retrieve(GET)
  - Update(PUT)
  - Delete(DELETE)

- API Design

  - 주로 복수명사를 사용(ex. /movies)
  - 필요하면 URL에 하위 자원을 표현(/movies/23)
  - 필터조건을 허용할 수 있음(/movies?state=active)
  - 버전도 포함 할 수 있음

- example

| URL            | Methods | Descriptions             |
| -------------- | ------- | ------------------------ |
| /movies        | GET     | 영화 리스트 가져오기     |
| /movies        | POST    | 영화 추가                |
| /movies/:title | DELETE  | title 해당 영화 삭제     |
| /movies/:title | PUT     | title 해당 영화 업데이트 |

## 2. RESTful API GET

- project

  - 기존 DB에 밑에 테이블을 만든다.

  | id  | title              | type      | grade | actor         |
  | --- | ------------------ | --------- | ----- | ------------- |
  | 1   | master             | action    | 9     | leebynghun    |
  | 2   | moonlight          | drama     | 9     | Barry Jenkins |
  | 3   | wall-E             | animation | 8     | robot         |
  | 4   | Zootopia           | adventure | 7     | Judy hops     |
  | 5   | The Sound of Music | musical   | 6     | Julie Andrews |

## 3. RESTful API POST
