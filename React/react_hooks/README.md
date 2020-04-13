# NOMAD CODERS

- [실전형 리액트 Hooks 10개](https://academy.nomadcoders.co/p/introduction-to-react-hooks) - Hooks 이론도 배우고 동시에 실전으로 바로 써먹을 수 있는 리액트 훅 10개를 만들어는 강의입니다.

- [x] useTitle
- [x] useInput
- [x] usePageLeave
- [x] useClick
- [x] useFadeIn
- [x] useFullscreen
- [x] useHover
- [x] useNetwork
- [x] useNotification
- [x] useScroll
- [x] useTabs
- [x] usePreventLeave
- [x] useConfirm
- [x] useAxios

## 패키지를 퍼블리싱 하는 방법

1. init - name, version, description, git repository, main 등등 입력
```
npm init
```

2. react install - package.json에서 설치된 dependencies를 peerDependencies(요구되지만, 설치되어있다면 설치할 필요가 없음)로 변경
```
npm i react react-dom --save
```

3. npm login
```
npm login
```

4. npm publish
```
npm publish --access public
```

