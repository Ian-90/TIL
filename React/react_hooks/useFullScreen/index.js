import React from 'react';
import { useFullScreen } from './useFullScreen'

function App() {
  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small")
  }

  const { element, triggerFullScreen, exitFull } = useFullScreen(onFullS)
  return (
    <div className="App" style={{height: '1000vh'}}>
      <div ref={element}>
        <img src="https://images.mypetlife.co.kr/wp-content/uploads/2018/02/08140957/shutterstock_292917410.jpg" />
        <button onClick={exitFull}>Exit fullscreen</button>
      </div>
      <button onClick={triggerFullScreen}>Make fullscreen</button>
    </div>
  );
}

export default App;
