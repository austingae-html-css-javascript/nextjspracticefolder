import React from 'react'

const Post = ({post}) => {
  return (
    <div>
      <h1>{post.data.title}</h1>
    </div>
  );
}

export default Post