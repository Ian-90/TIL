import React from 'react';
import { useAxios } from './useAxios'

function App() {
  const { loading, data, error, refetch } = useAxios({ url: 'https://yts.am/api/v2/list_movies.json'})
  return (
    <div className="App">
      <div>{data && data.status}</div>
      <div>{loading && "Loading"}</div>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

export default App;
