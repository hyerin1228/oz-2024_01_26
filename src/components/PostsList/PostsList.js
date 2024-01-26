import React from "react";
import "./PostsList.css";

function PostsList({ posts, setPostIndexToEdit }) {
  return (
    <section id="posts-list">
      <h4>포스트 목록</h4>

      <ol>
        {posts.map((post, index) => (
          <li key={post.title}>
            <span>{post.title}</span>
            <button onClick={() => setPostIndexToEdit(index)}>수정하기</button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default PostsList;
