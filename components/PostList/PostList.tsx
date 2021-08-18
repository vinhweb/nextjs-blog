import React from 'react'
import PostItem from './PostItem'

const PostList = ({data}) => {
  let postList = data.sort(function compare(a, b) {
    let dateA:any = new Date(a.createdTime);
    let dateB:any = new Date(b.createdTime);
    return dateB - dateA;
  });
  
  return (
    <div className="space-y-8">
      {postList.map((item, index) => (
        <PostItem key={index} data={item} />
      ))}
    </div>
  )
}

export default PostList
