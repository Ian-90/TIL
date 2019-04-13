# NOMAD CODERS

* [REACTJS로 웹서비스 만들기](https://academy.nomadcoders.co/p/reactjs-fundamentals)

## 1. 시작하기

* 자바스크립트기반
```javascript
<ul>
  {restaurants.map((restaurant) => {
    return (
      <li>
        <span>{{restaurant.name}}</span>
        <span>{{restaurant.location}}</span>
      </li>
    )
  })}
</ul>
```

* Composition
  * 요소벌, 컴포넌트별 작업구조.

* 단방향 데이터플로우
  * 데이터가 변하면 UI도 업데이트됨.

* 설치
```bash
npx create-react-app 폴더명
```

## 2. Component 그리고 Props

* Component
  * JSX문법(React로 작성하는 HTML문법)을 사용 
  * 모든 Component는 render function을 가짐. (render - 출력)
  * Javascript 문법은 {} 안에 사용해야함

* Dataflow with Props
  * 컴포넌트 구조 - App > Movie > MoviePoster
  * Props - 부모가 자식에게 정보를 주는것
    * App.js
    ```javascript
    const movieTitles = [
      'Matrix',
      'Full Metal Jacket',
      'Oldboy',
      'Star Wars'
    ]

    const movieImages = [
      'http://ojsfile.ohmynews.com/down/images/1/ctzxp_249945_1[363282].jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF48z3ClBQhzf4wr301zI8b_prryzc2xHatueKEC5ZDXxTFsJ',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJCbvPYORxcd8jgGWMsosNeXIRVmI7ptMrsj3Dv81Rea1D2JU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDhhUig0ltFxr99G4LY90vweM34VJOoNoyvBaP-0Nm6MZSdhoabA'  
    ]

    class App extends Component {
      render() {
        return (
          <div className="App">
            <Movie title={movieTitles[0]} poster={movieImages[0]} />
            <Movie title={movieTitles[1]} poster={movieImages[1]} />
            <Movie title={movieTitles[2]} poster={movieImages[2]} />
            <Movie title={movieTitles[3]} poster={movieImages[3]} />
          </div>
        );
      }
    }
    ```
    * Movie.js
    ```javascript
      class Movie extends Component {
        render() {
          console.log(this.props)
          return (
            <div>
              <h1>{this.props.title}</h1>  
              <MoviePoster poster={this.props.poster} />
            </div>
          );
        }
      }      
    ```
    * 개발자 도구로 보기
    ![개발자 도구](./assets/lecture_2-2_props.png)

* Lists with map
  * 많은 정보를 복사,붙여넣기하기엔 비효율적임. 그래서 javascript method인 [Array.map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)을 이용할것임 

  * App.js Refactoring
  ```javascript
  const movies = [
    {
      title: 'Matrix',
      poster: 'http://ojsfile.ohmynews.com/down/images/1/ctzxp_249945_1[363282].jpg',
    },
    {
      title: 'Full Metal Jacket',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF48z3ClBQhzf4wr301zI8b_prryzc2xHatueKEC5ZDXxTFsJ'
    },
    {
      title: 'Oldboy',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJCbvPYORxcd8jgGWMsosNeXIRVmI7ptMrsj3Dv81Rea1D2JU'
    },
    {
      title: 'Star Wars',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDhhUig0ltFxr99G4LY90vweM34VJOoNoyvBaP-0Nm6MZSdhoab'
    }
  ]

  class App extends Component {
    render() {
      return (
        <div className="App">
          {movies.map(movie => {
            return <Movie title={movie.title} poster={movie.poster} />
          })}
        </div>
      );
    }
  }
  ```