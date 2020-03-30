import { createSelector } from 'reselect'
import _ from 'lodash'

// section 7

const postSelector = state => state.posts
const selectedPostsSelector = state => state.selectedPostIds

const getPosts = (posts, selectedPostIds) => {
  const selectedPosts = _.filter(
    posts,
    post => _.contains(selectedPostIds, post.id)
  )

  return selectedPosts;
}

export default createSelector(
  postSelector,
  selectedPostsSelector,
  getPosts
)