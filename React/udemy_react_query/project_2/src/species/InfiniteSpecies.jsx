import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query'

import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
    'sw-species',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage, allPage) => lastPage.next || undefined
    }
  )

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (isError) {
    return <div>Error, {error.toString()}</div>
  }
  return (
    <>
      {isFetching && <div className="loading">Loading..</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map(pageData => {
          return pageData.results.map(spec => {
            return (
              <Species
                key={spec.name}
                name={spec.name}
                language={spec.language}
                averageLifespan={spec.average_lifespan}
              />
            )
          })
        })}
      </InfiniteScroll>
    </>
  )
}
