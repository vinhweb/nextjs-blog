import React from 'react'
import PostItem from './PostItem'
import _ from 'lodash'

const PostList = ({data}) => {
  let postList = data.sort(function compare(a, b) {
    let dateA = new Date(a.createdTime);
    let dateB = new Date(b.createdTime);
    return dateB - dateA;
  });
  
  return (
    <div className="space-y-8">
      {postList.map(item => (
        <PostItem data={item} />
      ))}
    </div>
  )
}

export default PostList
