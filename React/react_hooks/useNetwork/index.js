import React from 'react';
import { useNetwork } from './useNetwork'

function App() {
  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offLine")
  }
  const onLine = useNetwork(handleNetworkChange)
  return (
    <div className="App">
      <h1>{onLine ? "Online" : "OffLine"}</h1>
    </div>
  );
}

export default App;
